<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
    <div>
      <h3>Iniciar Sesión</h3>

      <div>
        <label for="email">Email
          <input id="email" v-model.trim="email" type="email" />
        </label>
      </div>

      <div>
        <label for="password" >Contraseña
          <input id="password" v-model="password" type="password" />
        </label>
      </div>

      <button type="submit" @click="login">Iniciar sesión</button>
    </div>

    <div>
      <p>¿No tienes cuenta? <router-link to="/register">Registrarse</router-link></p>
    </div>

    <div>
      {{ errorMsg }}
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
      password: '',
      errorMsg: '',
      logged: false,
    };
  },
  methods: {
    login() {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const params = {
        user: {
          email: this.email,
          password: this.password,
        },
      };

      axios.post('http://localhost:3000/login', params, headers)
      .then((res) => {
        localStorage.setItem("token", res.headers.get("Authorization"));
        this.$router.push('/')
      })
      .catch((error) => {
        this.errorMsg =  error.response.data;
      });
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
        this.$router.push('/')
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
  created() {
    this.checkUser()
  },
};
</script>
