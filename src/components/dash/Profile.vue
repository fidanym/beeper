<template>
    <div id="profile">
        <div>
            <p class="text-center"><img :src="user.avatar" class="rounded-circle"></p>
            <h2 class="text-center">@{{ user.username }}</h2>
            <hr>
            <p class="text-center m-b-20">{{ user.about }}</p>
            <beep-list :endpoint="'/users/' + $route.params.username + '/beeps'" :show-user-info="false"></beep-list>
        </div>
    </div>
</template>

<script>
    import BeepList from "./BeepList";

    export default {
        name: "Profile",
        components: {
            beepList: BeepList
        },
        created: function () {
            this.getUser();
        },
        data: function () {
            return {
                user: {}
            }
        },
        watch: {
            $route: 'getUser'
        },
        methods: {
            getUser: function () {
                this.$http.get('/users/' + this.$route.params.username)
                    .then(function (res) {
                        this.user = res.body;
                    })
            }
        }
    }
</script>

<style scoped>
    #profile img {
        max-width: 200px;
    }
</style>
