<template>
  <div class="vue-tempalte">
    <form @submit.prevent="login()">
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Email address</label>
        <input
          required
          type="email"
          class="form-control form-control-lg"
          v-model="email"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          required
          type="password"
          class="form-control form-control-lg"
          v-model="password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
      let response = await fetch("http://localhost:8081/login", {
        method: "POST",
        body: fd
      });
      let result = await response.json();
      console.log(result);
      if (result.err) {
        this.$bvToast.toast(result.err, {
          title: "Error",
          autoHideDelay: 5000,
          variant: "danger",
          solid: true
        });
      } else {
        localStorage.setItem("userId", result._id);
        window.location.href = "/";
      }
    }
  }
};
</script>
