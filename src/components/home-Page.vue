<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

defineProps<{
  fullName: string
  projectDate: string
  buttonTitle: string
}>()
</script>

<template>
  <div class="container">
    <p class="fName">{{ fullName }}</p>
    <p class="pDate">Date created {{ projectDate }}</p>
    <nav>
      <RouterLink class="bTitle" to="/todolist">{{ buttonTitle }}</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped>
.container {
  position: absolute;
  display: inline-block;
  width: 400px;
  height: 350px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -190px;
  background-color: #eadbc8;
  border-radius: 10px;
}

.container .fName {
  text-align: center;
  margin-top: 20px;
  color: #293241;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
  font-size: x-large;
}

.container .pDate {
  text-align: center;
  margin-top: 20px;
  color: #293241;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
  font-size: x-large;
}

.bTitle {
  position: absolute;
  text-align: center;
  border-radius: 50px;
  font-weight: bold;
  width: 150px;
  height: 40px;
  top: 300px;
  left: 120px;
  background-color: #ffc94a;
  color: #293241;
  border: 2px solid black;
  padding-top: 6px;
}
.bTitle:hover {
  background-color: #ff8a08;
}
</style>
