<template>
<div class="menuBar">
  <button><router-link to="page1">page1</router-link></button>
  <button><router-link to="page2">page2</router-link></button>
</div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "menuBar"
}
</script>

<style scoped>
.menuBar {
  width: 100%;
  height: 100px;
  background-color: gray;
}
button {
  background-color: white;
  color: black;
  border-radius: 10px;
  border: 2px solid black;
}

</style>