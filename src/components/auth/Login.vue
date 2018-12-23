<template>
    <div>
        <h4 class="text-center m-b-20">Login</h4>

        <input type="text" v-model="user.username" class="form-control m-b-15" placeholder="Username">
        <input type="password" v-model="user.password" class="form-control" placeholder="Password">

        <hr>

        <button @click="login" class="btn btn-lg btn-primary btn-block m-b-15">Sign in</button>

        <p class="text-center">
            Don't have an account? <router-link to="/auth/register">Sign up!</router-link>
        </p>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data: function () {
      return {
        user: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      login: function () {
        this.$http.post("/auth", this.user)
          .then(function (res) {

          })
      }
    }
  }
</script>

<style scoped>

</style>
