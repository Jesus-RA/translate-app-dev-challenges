<script setup>
// Icons
import SoundMax from './icons/SoundMax.vue';
import Copy from './icons/Copy.vue';
import SortAlpha from './icons/SortAlpha.vue';
import ExpandDown from './icons/ExpandDown.vue';

import Card from './Card.vue';

import { useTranslator } from '@/stores/translator';
import { watch, onBeforeMount } from 'vue';

import { copyToClipboard } from '@/utils.js';

const translator = useTranslator();
const MAX_CHARS = 500;

onBeforeMount(async () => {
    translator.baseText = 'Hello, how are you?';
    await translator.translate();
});

watch(() => translator.baseText, (newVal, oldVal) => {
    if(newVal.length > MAX_CHARS){
        translator.baseText = translator.baseText.slice(0, 500);
    }
});

</script>

<template>
    <Card>
        <template #header>
            <section class="flex gap-x-1">
                <button
                    v-for="(language, code,) in translator.LANGUAGES"
                    :key="code"
                    class="py-1 px-3 border-0 rounded-xl font-semi-bold text-gray-500 hover:text-current" :class="{ 'bg-gray-500 text-slate-100': code === translator.fromLanguage }"
                    @click="translator.setFromLanguage(code)"
                >
                    {{ language }}
                </button>
                <button>
                    <ExpandDown class="inline-block"/>
                </button>
            </section>
        </template>

        <template #body>
            <section class="flex flex-col h-full">
                <textarea
                    v-model="translator.baseText"
                    class="w-full h-full bg-transparent outline-none resize-none"
                ></textarea>
                <span class="text-gray-400 text-right text-xs">{{ translator.baseText.length }}/{{ MAX_CHARS }}</span>
            </section>
        </template>

        <template #footer>
            <section class="flex justify-between items-center">
                <div class="flex justify-between gap-x-3 h-min">
                    <button
                        @click="translator.readOutLoud('source')"
                        class="px-1 py-2 border border-2 border-gray-600 rounded-xl hover:bg-current"
                    >
                        <SoundMax class="w-7 h-5" />
                    </button>
                    <button
                        @click="copyToClipboard(translator.baseText)"
                        class="px-1 py-2 border border-2 border-gray-600 rounded-xl hover:bg-current"
                    >
                        <Copy class="w-7 h-5" />
                    </button>
                </div>

                <button
                    @click="translator.translate"
                    @keyup.enter="translator.translate"
                    :disabled="translator.loading"
                    class="px-6 py-2 border border-2 border-indigo-300 bg-indigo-600 rounded-xl flex items-center justify-between"
                    :class="{ 'opacity-75': translator.loading }"
                >
                    <SortAlpha class="inline-block"/>
                    <span :class="{ 'flex items-center gap-x-3 loading': translator.loading, }">Translate</span>
                </button>
            </section>
        </template>
    </Card>
</template>

<style scoped>

.loading:after{
    content: '';
    display: inline-block;
    height: 20px;
    width: 20px;
    border: 3px solid;
    border-radius: 100%;
    border-color: rgba(255, 255, 255, 0.3);
    border-right-color: inherit;
    
    animation: spinner .9s linear infinite;
}


@keyframes spinner{
    to{
        transform: rotate(360deg);
    }
}

</style>