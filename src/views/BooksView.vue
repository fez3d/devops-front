<template>
  <NavBar :email="email" :logged="logged" @logoutEvent="updateEvent"/>
  <div>
    <button class="btn btn-primary mb-3" @click="$router.push('/libros/nuevo')">Agregar</button>
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
        <tr v-for="book in books" v-bind:key="book">
          <td>{{ book.id }}</td>
          <td>{{ book.name }}</td>
          <td>{{ book.release }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.rating }}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-primary" @click="$router.push(`/libros/${book.id}`)">Ver</button>
              <button class="btn btn-primary" @click="$router.push(`/libros/${book.id}/editar`)">Editar</button>
              <button class="btn btn-primary" @click="deleteBook(book.id)">Eliminar</button>
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
      books: [],
    };
  },
  methods: {
    deleteBook(id){
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };

      axios.delete(`http://localhost:3000/books/${id}`, headers)
      .then((res) => {
        this.getBooks();
      })
    },
    getBooks() {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      };

      axios.get('http://localhost:3000/books', headers)
      .then((res) => {
        this.books = res.data
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
  created() {
    this.checkUser()
  },
  beforeMount(){
    this.checkUser();
    this.getBooks();
  }
};
</script>