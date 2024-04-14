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
  }
};
</script>
<template>
  <div v-for="(option, index) in shuffledOptions" :key="index">
    <input type="radio" :id="'option' + index" :value="option.name" v-model="selectedOptions">
    <label :for="'option' + index" :class="`answer-${option.correct}`">{{ option.name }}</label>
  </div>
</template>
<style scoped>
input:checked {
  & + .answer-true{
    color: green;
  }
  & + .answer-false {
    color: red;
  }
}
</style>