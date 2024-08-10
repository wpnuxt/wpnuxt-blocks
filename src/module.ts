import fs, { existsSync } from 'node:fs'
import { defineNuxtModule, createResolver, addComponentsDir, addComponent, addTemplate, installModule } from '@nuxt/kit'
import { genDynamicImport } from 'knitwork'
import type { Component } from '@nuxt/schema'
import { name, version } from '../package.json'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'wpNuxtBlocks'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolve('./runtime', path)

    console.log('!!! Setup @wpnuxt/blocks module')

    nuxt.options.alias['#wpnuxt/blocks'] = resolve(nuxt.options.buildDir, 'wpnuxt/blocks')

    addComponentsDir({
      path: resolveRuntimeModule('./components/blocks'),
      pathPrefix: false,
      prefix: '',
      global: true
    })
    // Register user block components
    const _layers = [...nuxt.options._layers].reverse()
    for (const layer of _layers) {
      const srcDir = layer.config.srcDir
      const blockComponents = resolve(srcDir, 'components/blocks')
      const dirStat = await fs.promises.stat(blockComponents).catch(() => null)
      if (dirStat && dirStat.isDirectory()) {
        nuxt.hook('components:dirs', (dirs) => {
          dirs.unshift({
            path: blockComponents,
            global: true,
            pathPrefix: false,
            prefix: ''
          })
        })
      }
    }
    addComponent({ name: 'BlockComponent', filePath: resolveRuntimeModule('./components/BlockComponent') })
    addComponent({ name: 'BlockInfo', filePath: resolveRuntimeModule('./components/BlockInfo') })
    addComponent({ name: 'BlockRenderer', filePath: resolveRuntimeModule('./components/BlockRenderer') })

    // TODO: how to correctly merge the queries from 3 places: wpnuxt-module + wpnuxt/blocks + user?
    /* const queryOutputPath = resolve((nuxt.options.srcDir || nuxt.options.rootDir) + '/.queries/')

    const userQueryPath = '~/extend/queries/'
      .replace(/^(~~|@@)/, nuxt.options.rootDir)
      .replace(/^(~|@)/, nuxt.options.srcDir)
    const userQueryPathExists = existsSync(userQueryPath)

    fs.cpSync(resolveRuntimeModule('./queries/'), queryOutputPath, { recursive: true })
    if (userQueryPathExists) {
      console.log('!!! Extending queries:', userQueryPath)
      fs.cpSync(resolve(userQueryPath), queryOutputPath, { recursive: true })
    }
    console.log('!!! Copied merged queries in folder:', queryOutputPath) */

    // TODO: check if we can do this and still use hasNuxtModule('@wpnuxt/blocks') in the wpnuct core module
    /* await installModule('../../wpnuxt-module/src', {
    }) */

    const componentsContext = { components: [] as Component[] }
    nuxt.hook('components:extend', (newComponents) => {
      const moduleBlocksDir = resolveRuntimeModule('./components/blocks')
      // TODO: support layers
      const userBlocksDir = (nuxt.options.srcDir || nuxt.options.rootDir) + '/components/blocks'
      componentsContext.components = newComponents.filter((c) => {
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
