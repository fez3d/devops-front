<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <a v-if="logged" href="#" @click="logout">Salir</a>
    <router-link v-else to="/login">Ingresar</router-link>
  </nav>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from 'axios';

export default {
  props: {
    email: String,
    logged: Boolean
  },
  methods: {
    logout() {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token"),
        },
      };

      axios.delete('http://localhost:3000/logout', headers)
      .then((res) => {
        localStorage.removeItem("token");
        this.$emit('logoutEvent')
        this.$router.push('/')
      })
      .catch((error) => {
      });
    },
  }
}
</script>