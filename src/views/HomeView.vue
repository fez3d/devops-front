<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>

  <div>
    <router-link to="/peliculas">Ver Peliculas</router-link> |
    <router-link to="/libros">Ver Libros</router-link>
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
