<script setup lang="ts">
const { data: posts } = await useWPPosts()
</script>

<template>
  <div>
    <header class="prose max-w-5xl mx-auto p-5">
      Components:
      <span
        v-for="post, index in posts"
        :key="index"
      >
        <NuxtLink
          v-if="post.slug"
          :to="'/' + post.slug"
        >
          {{ post.title }}
        </NuxtLink>
        <span v-if="index !== posts.length - 1"> - </span>
      </span>
      <br>
    </header>
    <hr>
    <main class="prose max-w-5xl mx-auto p-5">
      <slot />
    </main>
  </div>
</template>
