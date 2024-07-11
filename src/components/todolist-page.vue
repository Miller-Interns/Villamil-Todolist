<script setup lang="ts">
import { RouterLink } from 'vue-router'
import noteIcon from '@/components/icons/title-Icon.vue'

import {
  statusShowCategory,
  newCategoryName,
  addNewCategory
} from '@/composables/category-creation'
import categoryPage from './category-page.vue'

import { RouterName } from '@/types/enum-variables'

const props = defineProps({
  introductionTitle: String
})
</script>

<template>
  <div class="conCategory">
    <h1 class="conCategoryTitle"><noteIcon />{{ props.introductionTitle }}</h1>
    <RouterLink class="backhome" :to="RouterName.firstPage">Back</RouterLink>
    <button class="createCatButton" @click="statusShowCategory = !statusShowCategory">
      New Category
    </button>
    <input
      class="catInputBox"
      v-model="newCategoryName"
      v-show="statusShowCategory"
      placeholder="Enter Category Name"
    />
    <button class="continueCatButton" v-show="statusShowCategory" @click="addNewCategory">
      Create
    </button>
  </div>
  <categoryPage />
</template>

<style scoped>
.conCategory {
  position: absolute;
  top: 2px;
  left: 10px;
  right: 10px;
  height: 70px;
  background-color: #eadbc8;
  margin-top: 5px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.conCategoryTitle {
  position: absolute;
  place-items: center;
  width: auto;
  top: auto;
  color: #293241;
  padding-top: 10px;
  margin-left: 45%;
}

.backhome {
  position: absolute;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  top: 24px;
  left: 50px;
  height: 20px;
  width: 50px;
  margin-left: -40px;
  justify-content: center;
  background-color: #ffc94a;
  color: #293241;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 10px;
}

.backhome:hover {
  background-color: #ff8a08;
}

.createCatButton {
  position: absolute;
  display: inline;
  align-items: right;
  font-weight: bold;
  top: 24px;
  right: 10px;
  height: 20px;
  width: 110px;
  background-color: #ffc94a;
  color: #293241;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 10px;
}

.createCatButton:hover {
  background-color: #ff8a08;
}

.catInputBox {
  position: absolute;
  top: 10px;
  right: 130px;
}

.continueCatButton {
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 40px;
  right: 175px;
  height: 20px;
  width: 70px;
  background-color: #ffc94a;
  font-weight: bold;
  color: #293241;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 10px;
}

.continueCatButton:hover {
  background-color: #ff8a08;
}
</style>
