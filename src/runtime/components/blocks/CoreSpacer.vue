<script setup lang="ts">
import type { CoreSpacer } from '#wpnuxt/blocks'

defineProps<{
  block: CoreSpacer
}>()
</script>

<template>
  <div
    :class="block.attributes?.className"
    :style="{
      height: block.attributes?.spacerHeight,
      width: block.attributes?.spacerWidth
    }"
  />
</template>
