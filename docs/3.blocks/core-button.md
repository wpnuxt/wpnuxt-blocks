---
title: CoreButton
---

## attributes

```
anchor?: string;
backgroundColor?: string;
cssClassName?: string;
fontFamily?: string;
fontSize?: string;
gradient?: string;
style?: string;
text?: string;
textAlign?: string;
textColor?: string;
linkTarget?: string;
rel?: string;
url?: string;
linkClassName?: string;
```

## default component

```vue
<script setup lang="ts">
import type { CoreButton } from '#wpnuxt/blocks'

defineProps<{
  block: CoreButton
}>()
</script>

<template>
  <UButton
    :to="block.attributes.url"
    :target="block.attributes.linkTarget"
    :class="block.attributes.cssClassName"
    :rel="block.attributes.rel"
    :style="block.attributes.style"
  >
    <span v-sanitize="block.attributes.text" />
  </UButton>
</template>

```
