<template>
    <div id="auth">
        <div class="container">
            <div class="row">
                <div class="coll-md-4 col-md-offset-4 authForm">
                    <h2 class="text-center">Beeper</h2>
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Auth'
  }
</script>

<style scoped>

</style>
