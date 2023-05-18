<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
    <div>
      <h3>Agregar Pelicula</h3>

      <div>
        <label for="name">Nombre
          <input id="name" v-model="name" type="text" />
        </label>
      </div>

      <div>
        <label for="publisher">Editor
          <input id="publisher" v-model="publisher" type="text" />
        </label>
      </div>

      <div>
        <label for="genre">Genero
          <input id="genre" v-model="genre" type="text" />
        </label>
      </div>

      <div>
        <label for="release">Fecha de Lanzamiento
          <input id="release" v-model="release" type="number" />
        </label>
      </div>

      <div>
        <label for="rating">Rating
          <input id="rating" v-model="rating" type="number" />
        </label>
      </div>

      <button class="btn btn-primary" type="submit" @click="createMovie">Crear</button>
    </div>
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
    };
  },
  methods: {
    createMovie(){
      const params = {
        movie: {
          name: this.name,
          release: this.release,
          genre: this.genre,
          rating: this.rating,
          publisher: this.publisher,
        },
      };

      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };

      axios.post('http://localhost:3000/movies', params, headers)
      .then((res) => {
        this.$router.push('/peliculas');
      })
    },
    checkUser() {
      const test = localStorage.getItem("token");
      if (test !== null) {
        this.currentUser(test);
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
      });
    },
    updateEvent() {
      this.logged = false;
      this.email = '';
    }
  },
  beforeMount() {
    this.checkUser()
  },
};
</script>