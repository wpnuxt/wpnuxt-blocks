<script setup lang="ts">
import BlockComponent from './BlockComponent.vue'
import type { NodeWithEditorBlocksFragment } from '#build/graphql-operations'

defineProps<{
  post: NodeWithEditorBlocksFragment
}>()
</script>

<template>
  <div>
    <BlockComponent
      v-for="block, index in post.editorBlocks"
      :key="index"
      :block="block"
    />
  </div>
</template>
