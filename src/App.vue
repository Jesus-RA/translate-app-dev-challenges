<script setup>
// Icons
import Logo from './components/icons/Logo.vue';

// Components
import ContentToTranslate from './components/ContentToTranslate.vue';
import TranslatedContent from './components/TranslatedContent.vue';

import { ref } from 'vue';

</script>

<template>
<main class="min-h-dvh flex flex-wrap justify-center content-center gap-y-12 gap-x-5">
  <Logo class="w-full"/>

  <ContentToTranslate />
  <TranslatedContent />
</main>
</template>

<style scoped>
</style>