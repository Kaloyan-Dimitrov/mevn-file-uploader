<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav
      class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
    >
      <div class="container">
        <router-link class="navbar-brand float-left" to="/"
          >File Manager</router-link
        >

        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="!userId">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item" v-if="!userId">
            <router-link class="btn btn-outline-primary" to="/signup"
              >Sign up</router-link
            >
          </li>
          <li class="nav-item" v-else>
            <button class="btn btn-outline-primary" @click="signout()">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: localStorage.getItem("userId")
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("userId");
      window.location.href = "/";
    }
  }
};
</script>
