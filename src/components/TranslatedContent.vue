<script setup>
// Icons
import SoundMax from './icons/SoundMax.vue';
import Copy from './icons/Copy.vue';
import Switch from './icons/Switch.vue';
import ExpandDown from './icons/ExpandDown.vue';

import Card from './Card.vue';

import { useTranslator } from '@/stores/translator';
import { computed } from 'vue';

import { copyToClipboard } from '@/utils.js';

const translator = useTranslator();

const switchLanguages = () => {
  if(translator.fromLanguage === 'autodetect'){
    alert('Detect Language can not be set as target');
    return;
  }

  const fromLanguage = translator.fromLanguage;
  translator.fromLanguage = translator.toLanguage;
  translator.toLanguage = fromLanguage;
}

// Remove autodetect option from languages
const toTranslateLanguages = computed(() => {
  return Object.entries(translator.LANGUAGES)
  .filter(([key]) => key !== 'autodetect')
  .reduce((acc, cur) => {
    const [key, value] = cur;
    acc[key] = value;

    return acc;
  }, {})
});
</script>

<template>
  <Card>
      <template #header>
        <section class="flex gap-x-1 justify-between"> 

          <div>
            <button
              v-for="(language, code) in toTranslateLanguages"
              :key="code"
              class="py-1 px-3 border-0 rounded-xl font-semi-bold text-gray-500 hover:text-current" :class="{ 'bg-gray-500 text-slate-100': code === translator.toLanguage }"
              @click="translator.setToLanguage(code)"
            >
              {{ language }}
            </button>
            <button>
              <ExpandDown class="inline-block"/>
            </button>
          </div>

          <button
            @click="switchLanguages"
            class="px-0.5 py-0.5 border border-2 border-gray-600 rounded-xl justify-self-end hover:bg-current"
          >
            <Switch class="w-7 h-5"/>
          </button>
        </section>
      </template>

      <template #body>
        <p class="whitespace-break-spaces">
          {{ translator.translation }}
        </p>
      </template>

      <template #footer>
        <section class="flex gap-x-3">
            <button
              @click="translator.readOutLoud('target')"
              class="px-1 py-2 border border-2 border-gray-600 rounded-xl hover:bg-current"
            >
              <SoundMax class="w-7 h-5" />
            </button>
            <button
              @click="copyToClipboard(translator.translation)"
              class="px-1 py-2 border border-2 border-gray-600 rounded-xl hover:bg-current"
             >
              <Copy class="w-7 h-5" />
            </button>
          </section>
      </template>
  </Card>
</template>