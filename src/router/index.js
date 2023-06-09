import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import MoviesView from '../views/MoviesView.vue';
import BooksView from '../views/BooksView.vue';

import EditBookView from '../views/EditBookView.vue';
import EditMovieView from '../views/EditMovieView.vue';
import NewBookView from '../views/NewBookView.vue';
import NewMovieView from '../views/NewMovieView.vue';

import ShowBookView from '../views/ShowBookView.vue';
import ShowMovieView from '../views/ShowMovieView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/peliculas',
    name: 'movies',
    component: MoviesView,
  },
  {
    path: '/libros',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/libros/nuevo',
    name: 'newBook',
    component: NewBookView,
  },
  {
    path: '/peliculas/nuevo',
    name: 'newMovie',
    component: NewMovieView,
  },
  {
    path: '/peliculas/:id/editar',
    name: 'editMovie',
    component: EditMovieView,
  },
  {
    path: '/libros/:id/editar',
    name: 'editBook',
    component: EditBookView,
  },
  {
    path: '/peliculas/:id',
    name: 'showMovie',
    component: ShowMovieView,
  },
  {
    path: '/libros/:id',
    name: 'showBook',
    component: ShowBookView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {

  if (to.path == '/' || to.path == '/login' || to.path == '/register') {
    return true
  } else {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      };

      axios.get('http://localhost:3000/current_user', headers)
      .then((res) => {
        return true
      })
      .catch((error) => {
        localStorage.removeItem("token");
        return { name: 'login' }
      });
    } else {
      return { name: 'login' }
    }
  }
})


export default router;
