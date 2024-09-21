/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fsp } from 'node:fs'
import { defineNuxtModule, installModule, createResolver, addComponentsDir, addTemplate } from '@nuxt/kit'
import { genDynamicImport } from 'knitwork'
import type { Component } from '@nuxt/schema'
import { name, version } from '../package.json'

// Module options TypeScript interface definition
export interface ModuleOptions {
  enabled: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'wpNuxtBlocks'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    enabled: true
  },
  async setup(_options: any, nuxt: any) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolve('./runtime', path)

    console.log('::: Setting up @wpnuxt/blocks module')

    nuxt.options.alias['#wpnuxt/blocks'] = resolve(nuxt.options.buildDir, 'wpnuxt/blocks')

    // TODO: should we check if @wpnuxt/core is installed?

    await installModule('@nuxt/ui')
    await installModule('@nuxt/image', {
      // TODO: get wordpressUrl from @wpnuxt/core options
      domains: ['wordpress.wpnuxt.com']
    })

    addComponentsDir({
      path: resolveRuntimeModule('./components'),
      pathPrefix: false,
      prefix: '',
      global: true
    })
    // Register user block components
    const _layers = [...nuxt.options._layers].reverse()
    for (const layer of _layers) {
      const srcDir = layer.config.srcDir
      const blockComponents = resolve(srcDir, 'components/blocks')
      const dirStat = await fsp.stat(blockComponents).catch(() => null)
      if (dirStat && dirStat.isDirectory()) {
        nuxt.hook('components:dirs', (dirs: any) => {
          dirs.unshift({
            path: blockComponents,
            global: true,
            pathPrefix: false,
            prefix: ''
          })
        })
      }
    }
    const componentsContext = { components: [] as Component[] }
    nuxt.hook('components:extend', (newComponents: Component[]) => {
      const moduleBlocksDir = resolveRuntimeModule('./components')
      // TODO: support layers
      const userBlocksDir = (nuxt.options.srcDir || nuxt.options.rootDir) + '/components/blocks'
      componentsContext.components = newComponents.filter((c: Component) => {
        if (c.filePath.startsWith(moduleBlocksDir) || c.filePath.startsWith(userBlocksDir)) {
          return true
        }
        return false
      })
    })
    addTemplate({
      write: true,
      filename: 'wpnuxt/blocks.mjs',
      getContents({ options }) {
        const components = options.getComponents().filter((c: Component) => !c.island).flatMap((c: Component) => {
          const exp = c.export === 'default' ? 'c.default || c' : `c['${c.export}']`
          const isClient = c.mode === 'client'
          const definitions: string[] = []

          definitions.push(`export const ${c.pascalName} = ${genDynamicImport(c.filePath)}.then(c => ${isClient ? `createClientOnly(${exp})` : exp})`)
          return definitions
        })
        return components.join('\n')
      },
      options: { getComponents: () => componentsContext.components }
    })
  }
})
