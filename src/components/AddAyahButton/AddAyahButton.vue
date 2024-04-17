<script setup>
import { reactive } from 'vue'

const props = defineProps({
  ayah : Object,
  url : String
});
const ayah = reactive(props.ayah)   
const url = props.url;  
let disabled = false;


async function addAyah() {
  let nextAyahId= ayah.ayahId+1
  let nextChapterId = ayah.chapterId
  const res = await fetch(`${url}/verses/by_key/${nextChapterId}:${nextAyahId}`)
  const response = await res.json();
  if(response && response.status=='404') {
    ayah.value+=' *  '
    ayah.value+= 'صدق الله العظيم';
    disabled = true;    
  } else {
    let key = response.verse.verse_key;
    const nextText = await getTextFromAyahKey(key);
    ayah.value+=' * '
    ayah.value+= nextText;
    ayah.key=key
    ayah.ayahId=nextAyahId
  }
  
}

async function getTextFromAyahKey (AyahKey) {
  const ayahText = await fetch(`${url}/quran/verses/imlaei?verse_key=${AyahKey}`)
  const ayahTextResponse = await ayahText.json();
  let text = ayahTextResponse.verses[0].text_imlaei    
  return text
}

</script>

<template>
  <button class="rounded border w-full sm:w-auto px-4 py-2 mt-8 border-blue disabled:text-gray disabled:text-opacity-70" :disabled="disabled" type="button" id="addAyahButton" @click="addAyah()">زيدني آية أخرى</button>
</template>