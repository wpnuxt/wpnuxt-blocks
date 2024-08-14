<script setup lang="ts">
import type { CoreParagraph } from '#wpnuxt/blocks'

const props = defineProps<{
  block: CoreParagraph
}>()
const textCssClass = ref('text-md')
if (props.block.attributes?.fontSize && props.block.attributes?.fontSize !== '') {
  switch (props.block.attributes?.fontSize) {
    case 'small':
      textCssClass.value = 'text-sm'
      break
    case 'medium':
      textCssClass.value = 'text-md'
      break
    case 'large':
      textCssClass.value = 'text-lg'
      break
    case 'x-large':
      textCssClass.value = 'text-xl'
      break
    case 'xx-large':
      textCssClass.value = 'text-xl'
      break
  }
}
</script>

<template>
  <p
    :id="block?.attributes?.anchor"
    v-sanitize="block?.attributes?.content"
    :class="block?.attributes?.className != null ? block?.attributes?.className + ' ' + textCssClass : textCssClass"
    :style="block?.attributes?.style"
  />
</template>
