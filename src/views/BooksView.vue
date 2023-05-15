<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
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
      books: [],
    };
  },
  methods: {
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
  created() {
    this.checkUser()
  },
};
</script>