import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTranslator = defineStore('translator', () => {
    // const LANGUAGES = ['English', 'French', 'Spanish'];
    const LANGUAGES = {
        'autodetect': 'Detect Language',
        'en': 'English',
        'it': 'French',
        'es': 'Spanish',
    };

    let fromLanguage = ref('en');
    let toLanguage = ref('it');

    let baseText = ref('');
    let translation = ref('');

    let loading = ref(false);

    const translate = async () => {
        try{
            translation.value = 'Translating...';
            loading.value = true;

            const url = new URL('https://api.mymemory.translated.net/get');
            url.searchParams.append('q', baseText.value);
            url.searchParams.append('langpair', `${ fromLanguage.value }|${ toLanguage.value }`);

            // Example request:
            // https://api.mymemory.translated.net/get?q=Hello%20World!&langpair=en|it

            const response = await fetch(url);
            const data = await response.json();

            translation.value = data.responseData.translatedText;

        }catch(e){
            console.log({e});
            console.error(e);
            alert('An unexpected error has occured, please try again.')
        }
        finally{
            loading.value = false;
        }
    };

    const readOutLoud = async (selectedSource) => {
        if(!'speechSynthesis' in window){
            alert('Sorry, your browser does not support text to speech.');
            return;
        }

        const sources = {
            'source': {
                text: baseText.value,
                lang: fromLanguage.value,
            },
            'target': {
                text: translation.value,
                lang: toLanguage.value,
            }
        };

        if(!Object.keys(sources).includes(selectedSource)){
            console.error('Selected source should be one of these options: '  + Object.keys(sources).join(', '));
            return;
        }

        const speaker = new SpeechSynthesisUtterance();
        speaker.text = sources[selectedSource].text;
        speaker.lang = sources[selectedSource].lang;
        window.speechSynthesis.speak(speaker);
    };

    const setFromLanguage = (language) => {
        fromLanguage.value = language;
    }

    const setToLanguage = (language) => {
        toLanguage.value = language;
    }

    return { LANGUAGES, fromLanguage, toLanguage, baseText, translation, loading, translate, setFromLanguage, setToLanguage, readOutLoud };
});