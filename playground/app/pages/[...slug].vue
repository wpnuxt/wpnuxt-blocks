<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
const post = ref<PostFragment | PageFragment | undefined>()
if (route.params.slug && route.params.slug[0]) {
  const { data } = await useWPNodeByUri({ uri: route.params.slug[0] })
  post.value = data.value
}

definePageMeta({
  colorMode: 'light'
})
</script>

<template>
  <NuxtLayout>
    <BlockRenderer :blocks="post?.editorBlocks" />
    <StagingBanner />
  </NuxtLayout>
</template>
