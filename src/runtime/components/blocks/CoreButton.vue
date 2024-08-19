<script setup lang="ts">
import { convertFontSize, getCssClasses } from '../../util'
import type { CoreButton } from '#wpnuxt/blocks'
import { ref } from '#imports'

const props = defineProps<{
  block: CoreButton
}>()
const variant = ref('solid')
/* if (props.block.attributes?.cssClassName?.includes('is-style-outline')) {
  variant.value = 'outline'
} */
if (props.block.attributes?.metadata) {
  variant.value = props.block.attributes?.metadata?.replaceAll('"', '')
}
</script>

<template>
  <UButton
    :to="block.attributes.url"
    :target="block.attributes.linkTarget"
    :rel="block.attributes.rel"
    :style="block.attributes.style"
    :variant
    :class="getCssClasses(props.block)"
    :size="convertFontSize(props.block.attributes?.fontSize, '', 'md')"
  >
    <span v-sanitize="block.attributes.text" />
  </UButton>
</template>
