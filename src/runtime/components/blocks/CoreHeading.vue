<script setup lang="ts">
import type { CoreHeading } from '#wpnuxt/blocks'

defineProps<{
  block: CoreHeading
}>()
</script>

<template>
  <template v-if="block.attributes.level === 1">
    <h1
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
  <template v-else-if="block.attributes.level === 2">
    <h2
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
  <template v-else-if="block.attributes.level === 3">
    <h3
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
  <template v-else-if="block.attributes.level === 4">
    <h4
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
  <template v-else-if="block.attributes.level === 5">
    <h5
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
  <template v-else-if="block.attributes.level === 6">
    <h6
      :id="block?.attributes?.anchor"
      v-sanitize="block.attributes.content"
      :class="block.attributes?.className"
    />
  </template>
</template>
