<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

const props = defineProps({
  message: String,
  fromParentApp: Boolean,
});
</script>

<template>
  <div
    id="app1-id"
    style="
      width: 90%;
      height: 90%;
      border: 2px solid rebeccapurple;
      overflow-y: scroll;
    "
  >
    <p>From Parent => {{ message }}, {{ fromParentApp }}</p>
    <img src="./assets/vue.svg" alt="" />
    <h3>Child testimonials 11</h3>

    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style lang="scss" scoped>
* {
  color: red;
}
</style>
