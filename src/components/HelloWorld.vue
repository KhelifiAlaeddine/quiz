<script setup>
import { ref } from 'vue'
import RandomizedCheckboxes from './RandomizedCheckboxes.vue';

let ayah = ref('');
let chapter = ref ('')
let options = ref ([])

async function getRandomAyah() {
  let url = `https://api.quran.com/api/v4`;
  let randomAyah = {};
  const res = await fetch(`${url}/verses/random`)
  const response = await res.json();
  randomAyah.key = response.verse.verse_key
  
  const chapterId = (randomAyah.key).split(':')[0]
  const ayahChapter = await fetch(`${url}/chapters/${chapterId}`)
  const ayahChapterResponse = await ayahChapter.json()
  chapter = ayahChapterResponse.chapter.name_arabic
  const ayahText = await fetch(`${url}/quran/verses/imlaei?verse_key=${randomAyah.key}`)
  const ayahTextResponse = await ayahText.json();
  randomAyah.text = ayahTextResponse.verses[0].text_imlaei
  
  ayah.value = randomAyah.text

  options = [
    { name: chapter, correct: true },
    { name: 'Option B', correct: false },
    { name: 'Option C', correct: false }
  ]
}
getRandomAyah()
</script>

<template>
  <p>{{ ayah }}</p>
  <randomized-checkboxes :options="options" />
</template>

<style scoped>

</style>
