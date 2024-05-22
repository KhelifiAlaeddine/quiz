<template>
  <div>
    <h1 class=" text-green">
    book detail
  </h1>
    <div v-if="book">
      <h1>titre : {{ book.title }}</h1>
      <p> description : {{ book.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const book = ref(null);

const fetchBook = async () => {
  const bookId = route.params.id;
  try {
    const response = await axios.get(`https://freetestapi.com/api/v1/books/${bookId}`);
    book.value = response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
  }
};

onMounted(fetchBook);
</script>

<style>
/* Add some basic styling */
</style>
