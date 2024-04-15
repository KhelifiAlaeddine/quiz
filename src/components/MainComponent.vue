<script setup>
import { ref, watch } from 'vue'
import RandomizedRadios from './RandomizedRadios.vue';

let ayah = ref('');
let chapter = ref ('')
let options = ref ([])
let url = `https://api.quran.com/api/v4`;


async function getRandomAyah() {
  // verse=ayah
  //get the key of a random ayah   
  const res = await fetch(`${url}/verses/random`)
  const response = await res.json();
  let key = response.verse.verse_key
  return key
  
}

async function getChapterName(chapterId) {
  const ayahChapter = await fetch(`${url}/chapters/${chapterId}`)
  const ayahChapterResponse = await ayahChapter.json()
  //get the name of that chapter
  chapter = ayahChapterResponse.chapter.name_arabic
  return chapter
}

async function generateRandomChapter(min, max, ...values) {
  if (values.length === 1){
    values[0] = parseInt(values[0])
  }else{
    values = values.map((val)=>{
      return parseInt(val)
    })
  }
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === values[0] || num === values[1]) ? generateRandomChapter(min, max, ...values) : num;
}

async function getTextFromAyahKey (AyahKey) {
  const ayahText = await fetch(`${url}/quran/verses/imlaei?verse_key=${AyahKey}`)
  const ayahTextResponse = await ayahText.json();
  let text = ayahTextResponse.verses[0].text_imlaei    
  return text
}

async function createQuiz() {
  options.value = []
  try {
    const AyahKey = await getRandomAyah();
    ayah.key = AyahKey;

    const text = await getTextFromAyahKey(AyahKey);
    ayah.value = text;

    const chapterId = parseInt(AyahKey.split(':')[0]);
    const chapterName = await getChapterName(chapterId);
    ayah.chapter = chapterName;
    options.value.push({ name: chapterName, correct: true,id: chapterId});

    const fakeResponse1 = await generateRandomChapter(1, 114, chapterId);
    const fakeChapter1 = await getChapterName(fakeResponse1);
    options.value.push({ name: fakeChapter1, correct: false,id: fakeResponse1 });

    const fakeResponse2 = await generateRandomChapter(1, 114, chapterId, fakeResponse1);
    const fakeChapter2 = await getChapterName(fakeResponse2);
    options.value.push({ name: fakeChapter2, correct: false,id: fakeResponse2 });

    options.value = options.value.sort(() => Math.random() - 0.5);

  } catch (error) {
    console.error('Error creating quiz:', error);
  }
}


createQuiz()
</script>

<template>
  <div class="max-w-screen-sm text-lg flex align-center flex-col  p-4 m-4">
    
    <p dir="rtl" class="mb-4">{{ ayah }}</p>
    <p class="text-center">***</p>
    <randomized-radios :options=options />
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <button class="rounded border w-full sm:w-auto px-4 py-2 mt-8 border-blue" type="button" @click="createQuiz">اعطيني سورة أخرى</button>
      <button class="rounded border w-full sm:w-auto px-4 py-2 mt-8 border-blue" type="button" @click="createQuiz">زيدني آية أخرى</button>
      
    </div>
    
    

  </div>
</template>