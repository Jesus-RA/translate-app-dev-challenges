<script setup>
// Icons
import Logo from './components/icons/Logo.vue';

// Components
import ContentToTranslate from './components/ContentToTranslate.vue';
import TranslatedContent from './components/TranslatedContent.vue';
</script>

<template>
<main class="min-h-dvh flex flex-wrap justify-center content-center portrait:gap-y-12 landscape:sm:gap-y-4 landscape:lg:gap-y-12 gap-y-12 gap-x-5 px-4">
  <Logo class="w-full"/>

  <ContentToTranslate />
  <TranslatedContent />
</main>
</template>