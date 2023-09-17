<template>
<div class="page2">
   <div>
     <div class="current appointments"></div>
     <div class="modified appointments"></div>
   </div>

  <input type="button" value="save to database">



</div>
</template>

<script>
export default {
  name: "pageTwo"
}
</script>

<style scoped>
.page2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.page2 > div{
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
}
.appointments {
  width: 100%;
  height: 100px;
  background-color: gray;
}

textarea {
  resize: none;
  border-radius: 10px;
  border: 1px solid black;
  width: 100%;
  height: 100%;

}
</style>