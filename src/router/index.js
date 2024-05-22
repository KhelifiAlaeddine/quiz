import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Quiz from '../components/Quiz/index.vue';
import Books from '../components/Books/Books.vue';
import BookDetail from '../components/BookDetail/BookDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/quiz', component: Quiz },
  { path: '/books', component: Books },
  { path: '/book/:id', component: BookDetail, name: 'BookDetail' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
