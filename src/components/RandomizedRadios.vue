<script>
import { ref, computed } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selectedOptions = ref(null);
    
    const shuffledOptions = computed(() => {
      // Shuffle the options array
      return props.options.sort(() => Math.random() - 0.5);
    });

    return {
      selectedOptions,
      shuffledOptions
    };
  },
  methods: {
    verifyResponse(option) {
      document.querySelectorAll('.answer').forEach((el) => el.classList.remove('answer-good', 'answer-bad'));

      if(option.correct)  {
        if(document.querySelector('#response-'+option.id) ){
          document.querySelector('#response-'+option.id).classList.add("answer-good");
        }        
        
      } else {
        if(document.querySelector('#response-'+option.id) ){
          document.querySelector('#response-'+option.id).classList.add("answer-bad");
        } 
      }
      this.$emit('verify-response', option.value);
   }
  }
};
</script>
<template>
  <div v-for="(option, index) in shuffledOptions" :key="index">
    <fieldset class="answer" :id="'response-' + option.id">
      <input type="radio" :id="'option' + index"  :value="option.name" v-model="selectedOptions" @change="verifyResponse(option)">
      <label :for="'option' + index">{{ option.name }}</label>
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