<template>
    <div>
        <h4 class="text-center m-b-20">Register</h4>

        <input type="email" v-model="user.email" class="form-control m-b-15" placeholder="Email address">
        <input type="text" v-model="user.username" class="form-control m-b-15" placeholder="Username">
        <input type="password" v-model="user.password" v-on:keyup.enter="register" class="form-control" placeholder="Password">

        <hr>

        <button class="btn btn-lg btn-primary btn-block m-b-15" @click="register">Register</button>

        <p class="text-center">
            Already have an account? <router-link to="/auth/login">Sign in!</router-link>
        </p>
    </div>
</template>

<script>
  export default {
    name: 'Register',
    data: function () {
      return {
        user: {
          email: "",
          username: "",
          password: ""
        }
      }
    },
    methods: {
      register: function () {
        this.$http.post("/users", this.user)
          .then(function (res){
            this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Success!',
              text: 'You can now login with your username and password'
            });
            this.$router.push('/auth/login');
          })

      }
    }
  }
</script>

<style scoped>

</style>
