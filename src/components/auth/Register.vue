<template>
    <div>
        <h4 class="text-center m-b-20">Register</h4>

        <input type="email" v-model="user.email" class="form-control m-b-15" placeholder="Email address">
        <input type="text" v-model="user.username" class="form-control m-b-15" placeholder="Username">
        <input type="password" v-model="user.password" class="form-control" placeholder="Password">

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
        let self = this;
        this.$http.post("http://localhost:9090/users", this.user)
              .then(function (res){
                self.$notify({
                  group: 'foo',
                  type: 'success',
                  title: 'Success!',
                  text: 'You can now login with your username and password'
                });
                this.$router.push('/auth/login');
              })
              .catch(function (res) {
                if (res.status == 422) {
                  res.body.errors.forEach(function (e) {
                    self.$notify({
                      group: 'foo',
                      type: 'error',
                      title: 'Error',
                      text: e
                    });
                  })
                }
              })
      }
    }
  }
</script>

<style scoped>

</style>
