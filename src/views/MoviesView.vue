<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
    <button class="btn btn-primary mb-3" @click="$router.push('/peliculas/nuevo')">Agregar</button>
    <table class="table table-sm table-hover">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Lanzamiento</th>
          <th>Genero</th>
          <th>Editor</th>
          <th>Rating</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" v-bind:key="movie">
          <td>{{ movie.id }}</td>
          <td>{{ movie.name }}</td>
          <td>{{ movie.release }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.publisher }}</td>
          <td>{{ movie.rating }}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-primary" @click="$router.push(`/peliculas/${movie.id}`)">Ver</button>
              <button class="btn btn-primary" @click="$router.push(`/peliculas/${movie.id}/editar`)">Editar</button>
              <button class="btn btn-primary" @click="deleteMovie(movie.id)">Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      email: '',
      logged: false,
      movies: []
    };
  },
  methods: {
    deleteMovie(id){
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };

      axios.delete(`http://localhost:3000/movies/${id}`, headers)
      .then((res) => {
        this.getMovies();
      })
    },
    getMovies() {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };

      axios.get('http://localhost:3000/movies', headers)
      .then((res) => {
        this.movies = res.data
      })
    },
    checkUser() {
      const test = localStorage.getItem("token");
      if (test !== null) {
        this.currentUser(test);
      } else {
        this.$router.push('/');
      }
    },
    currentUser(token) {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      };

      axios.get('http://localhost:3000/current_user', headers)
      .then((res) => {
        this.logged = true;
        this.email = res.data.email;
      })
      .catch((error) => {
        localStorage.removeItem("token");
        this.logged = false;
        this.email = '';
        this.$router.push('/')
      });
    },
    updateEvent() {
      this.logged = false;
      this.email = '';
    }
  },
  beforeMount() {
    this.checkUser();
    this.getMovies();
  },
};
</script>