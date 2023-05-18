<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
    <p><b>Nombre:</b> {{ name }}</p>
    <p><b>Editor:</b> {{ publisher }}</p>
    <p><b>Genero:</b> {{ genre }}</p>
    <p><b>Lanzamiento:</b> {{ release }}</p>
    <p><b>Rating:</b> {{ rating }}</p>
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
      name: '',
      release: null,
      genre: '',
      publisher: '',
      rating: null,
    };
  },
  methods: {
    getMovie(id){
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };
      axios.get(`http://localhost:3000/movies/${id}`, headers)
      .then((res) => {
        this.name = res.data.name;
        this.release = res.data.release;
        this.rating = res.data.rating;
        this.genre = res.data.genre;
        this.publisher = res.data.publisher;
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
    this.getMovie(this.$route.params.id)
  },
};
</script>
