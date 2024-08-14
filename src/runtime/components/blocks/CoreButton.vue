<script setup lang="ts">
import type { CoreButton } from '#wpnuxt/blocks'

const props = defineProps<{
  block: CoreButton
}>()
const variant = ref('solid')
if (props.block.attributes?.cssClassName?.includes('is-style-outline')) {
  variant.value = 'outline'
}
const size = ref('md')
if (props.block.attributes?.fontSize && props.block.attributes?.fontSize !== '') {
  switch (props.block.attributes?.fontSize) {
    case 'small':
      size.value = 'sm'
      break
    case 'medium':
      size.value = 'md'
      break
    case 'large':
      size.value = 'lg'
      break
    case 'x-large':
      size.value = 'xl'
      break
    case 'xx-large':
      size.value = 'xl'
      break
  }
}
</script>

<template>
  <UButton
    :to="block.attributes.url"
    :target="block.attributes.linkTarget"
    :class="block.attributes?.className"
    :rel="block.attributes.rel"
    :style="block.attributes.style"
    :variant
    :size
  >
    <span v-sanitize="block.attributes.text" />
  </UButton>
</template>
