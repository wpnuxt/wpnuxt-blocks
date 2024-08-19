<script setup lang="ts">
import { getCssClasses } from '../../util'
import type { CoreParagraph } from '#wpnuxt/blocks'

const props = defineProps<{
  block: CoreParagraph
}>()
const cssClass = getCssClasses(props.block)
</script>

<template>
  <p
    :id="block?.attributes?.anchor"
    v-sanitize="block?.attributes?.content"
    :class="cssClass"
    :style="block?.attributes?.style"
  />
</template>
