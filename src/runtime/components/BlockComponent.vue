<script setup lang="ts">
import { pascalCase } from 'scule'
import { resolveComponent } from '#imports'
import type { EditorBlock } from '#wpnuxt/blocks'

const manifest = await import('#wpnuxt/blocks').catch(() => ({}))

const props = defineProps<{
  block: EditorBlock
}>()
const findComponentToRender = async () => {
  // only process top level blocks
  if (props.block.parentClientId === null || props.block.parentClientId === undefined) {
    if (props.block.name) {
      const componentName = pascalCase(props.block.name)
      const componentImporter = manifest[componentName]
      if (typeof componentImporter === 'function') {
        return await componentImporter()
      }
    }
    return resolveComponent('EditorBlock')
  } else {
    return undefined
  }
}
const componentToRender = await findComponentToRender()
</script>

<template>
  <component
    :is="componentToRender"
    v-if="componentToRender"
    :block="block"
  />
</template>
