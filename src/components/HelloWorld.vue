<script setup>
import { ref } from 'vue'
import RandomizedCheckboxes from './RandomizedCheckboxes.vue';

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
  return (num === values[0] || num === values[1]) ? generateRandomChapter(min, max) : num;
}

async function getTextFromAyahKey (AyahKey) {
  const ayahText = await fetch(`${url}/quran/verses/imlaei?verse_key=${AyahKey}`)
  const ayahTextResponse = await ayahText.json();
  let text = ayahTextResponse.verses[0].text_imlaei    
  return text
}

function createQuiz () {
//get random ayah
getRandomAyah().then((AyahKey)=> {
  //add ayah key to ayah reference
  ayah.key = AyahKey
  getTextFromAyahKey(AyahKey).then((text)=>{
  	ayah.value=text
  })
  //get chapterId from ayahKey
  const chapterId = AyahKey.split(':')[0]
  //get chapter name from chapterId
  getChapterName(chapterId).then((chapterName)=>{
    //add chapter name to ayah reference
    ayah.chapter = chapterName
    options.value.push({ name: chapterName, correct: true })
     //generate first random chapter
    generateRandomChapter (1,114,chapterId).then((fakeResponse1)=> {
      //get name for the first random chapter
      getChapterName(fakeResponse1).then((fakeChapter1)=> {
        options.value.push({ name: fakeChapter1, correct: false })
      })
      //generate second random chapter
      generateRandomChapter(1,114,chapterId,fakeResponse1).then((fakeResponse2)=>{
        //get name for the second random chapter
        getChapterName(fakeResponse2).then((fakeChapter2)=> {
        options.value.push({ name: fakeChapter2, correct: false })        
        })
      })
    }) 
  })
})      
}

createQuiz()
</script>

<template>
  <p>{{ ayah }}</p>
  <randomized-checkboxes :options=options />
</template>

<style scoped>

</style>
