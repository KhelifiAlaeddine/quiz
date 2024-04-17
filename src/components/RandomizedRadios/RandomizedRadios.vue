<script setup>
import { ref } from 'vue';

const selectedOptions = ref(null);

const props = defineProps({
  options: Array,
});
const emits = defineEmits(["disableAyahButton"])


function verifyResponse(option,options) { 
  emits("disableAyahButton", true)
  const correctAnswer = options.find(option => option.correct);
  document.querySelectorAll('.answer').forEach((el) => el.setAttribute("disabled", ''));  
  if(option.correct)  {
    if(document.querySelector('#response-'+option.id) ){
      document.querySelector('#response-'+option.id).classList.add("answer-good");
      document.querySelector('#response-'+option.id+' .answer-good-icon').classList.remove("invisible");
    }       
    
  } else {
    if(document.querySelector('#response-'+option.id) ){
      document.querySelector('#response-'+option.id).classList.add("answer-bad");      
      document.querySelector('#response-'+option.id+' .answer-bad-icon').classList.remove("invisible");
    } 
    if(document.querySelector('#response-'+correctAnswer.id) ){
      document.querySelector('#response-'+correctAnswer.id).classList.add("answer-good","clignote");
    } 
  }
}

</script>
<template>
  <div v-for="(option, index) in options" :key="index">
    <fieldset class=" answer disabled:text-gray disabled:text-opacity-70  p-2 border text-center cursor-pointer text-blue-600" :id="'response-' + option.id">
      <input class="absolute hidden " type="radio" :id="'option' + index"  :value="option.name" v-model="selectedOptions" @change="verifyResponse(option,options)">
      <label class="block" :for="'option' + index">
       <div  class="flex align-center justify-center">
        <span v-if="option.correct" class="answer-good-icon px-4 invisible">
          👏
        </span>
        <span v-else class="answer-bad-icon px-4 invisible">
          😢
        </span>
        <span>{{ option.name }} </span>        
       </div>   
      </label>
    </fieldset>    
  </div>
</template>
<style lang="scss">
.answer {
  input,label {
    cursor: pointer;
  }
  &-good {
    background-color: lightgreen;
  }
  &-bad {
    background-color: lightcoral;
  }
}
</style>