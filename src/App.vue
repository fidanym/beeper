<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <notifications group="foo"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style src="./assets/beeper.css"></style>
