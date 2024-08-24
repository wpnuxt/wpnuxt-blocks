<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import type { PostFragment, PageFragment } from '#graphql-operations'

const route = useRoute()
const post = ref<PostFragment | PageFragment | undefined>()
if (route.params.slug && route.params.slug[0]) {
  const { data } = await useWPNodeByUri({ uri: route.params.slug[0] })
  post.value = data
}

definePageMeta({
  colorMode: 'light'
})
</script>

<template>
  <NuxtLayout>
    <WPContent :node="post" />
    <StagingBanner />
  </NuxtLayout>
</template>
