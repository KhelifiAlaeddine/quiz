<script setup>
import { ref, computed } from 'vue';
let books = ref([])
const search = ref('');

async function getBooks() {
  const result = await fetch("https://freetestapi.com/api/v1/books")
  const response = await result.json()
  books.value = response
}
const filteredBooks = computed(() => {  
  return books.value.filter(book =>
    book.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

getBooks()
</script>

<template>
  <h1 class=" text-green">
    Books
  </h1>
  <div>
      <input type="text" class="dark:bg-gray-dark border" v-model="search"  placeholder="serach here" />
      <ul v-for="book in filteredBooks" :key="book.id">
      <li>
        <router-link :to="{ name: 'BookDetail', params: { id: book.id } }">{{ book.title }}</router-link>
      </li>  
    
      </ul>
  </div>
</template>