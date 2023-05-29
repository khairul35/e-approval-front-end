<template>
  <main-layout
    v-if="
      $route.path != '/login' && $route.path != '/login/'
      && $route.path != '/register' && $route.path != '/register/'
    "
  />
  <router-view
    v-slot="{ Component }"
    v-if="
      $route.path == '/login' || $route.path == '/login/'
      || $route.path == '/register' || $route.path == '/register/'
    "
  >
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './layout/MainLayout.vue';
import XeroRepository from './repository/XeroRepository';

function getQueryParametersFromCurrentURL(): { [key: string]: string } {
  const params: { [key: string]: string } = {};

  const queryString = window.location.search.substring(1);
  if (queryString) {
    const keyValuePairs = queryString.split('&');
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    }
  }

  return params;
}

export default defineComponent({
  data() {
    return {};
  },
  components: {
    MainLayout,
  },
  methods: {
    async generateToken() {
      await XeroRepository.generateToken(this.code)
        .then(() => {
          window.location.reload();
        })
    },
  },
  mounted() {
      const newPath = window.location.pathname;
      const loggedIn = localStorage.getItem("logged_in") == "true";
      if (!loggedIn && newPath !== "/register" && newPath !== "/register/") {
        this.$router.push("/login");
      } else if (!loggedIn || newPath == "/register/" || newPath == "/register") {
        this.$router.push("/register");
      } else {
        this.$router.push("purchase-order");
      }
      const {
        code,
        scope,
        session_state,
        state
      } = getQueryParametersFromCurrentURL();
      this.code = code;
      this.scope = scope;
      this.sessionState = session_state;
      this.state = state;
      if (code) {
        this.generateToken();
      }
  }
})
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
