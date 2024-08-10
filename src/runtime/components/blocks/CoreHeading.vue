<script setup lang="ts">
import type { CoreHeading } from '#wpnuxt/blocks'

defineProps<{
  block: CoreHeading
}>()
</script>

<template>
  <template v-if="block.attributes.level === 1">
    <h1 v-sanitize="block.attributes.content" />
  </template>
  <template v-if="block.attributes.level === 2">
    <h2 v-sanitize="block.attributes.content" />
  </template>
  <template v-if="block.attributes.level === 3">
    <h3 v-sanitize="block.attributes.content" />
  </template>
  <template v-if="block.attributes.level === 4">
    <h4 v-sanitize="block.attributes.content" />
  </template>
  <template v-if="block.attributes.level === 5">
    <h5 v-sanitize="block.attributes.content" />
  </template>
  <template v-if="block.attributes.level === 6">
    <h6 v-sanitize="block.attributes.content" />
  </template>
</template>
