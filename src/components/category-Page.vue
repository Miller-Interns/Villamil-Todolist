<script setup lang="ts">
import { onMounted } from 'vue'
import { useStorage } from '@/stores/local-Storage'

import {
  deleteCategory,
  isEditingCategory,
  editableCategoryName,
  startEditingCategory,
  saveCategory,
  canceleditingCategory,
  categoryList
} from '@/composables/category-Creation'

import {
  newTaskTitle,
  addNewTask,
  editingTaskId,
  startEditingTask,
  saveTask,
  cancelEditingTask,
  deleteTask
} from '../composables/counter'

import { onDrop, onDragOver, onDragStart } from '../composables/draggable-Task'

onMounted(() => {
  useStorage()
})
</script>

<template>
  <div class="conCategoryList">
    <div
      v-for="category in categoryList"
      :key="category.id"
      class="categoryList"
      :data-category-id="category.id"
      @dragover="onDragOver"
      @drop="(event) => onDrop(event, category.id)"
    >
      <span
        class="categoryTitle"
        v-if="!isEditingCategory(category.id)"
        @dblclick="startEditingCategory(category.id, category.name)"
      >
        {{ category.name }}</span
      >
      <input
        v-else
        v-model="editableCategoryName"
        @keydown.enter="saveCategory(category.id)"
        @keydown.esc="canceleditingCategory()"
        class="editInput"
      />
      <button class="catDelete" @click="deleteCategory(category.id)">X</button>

      <div class="taskCreate">
        <input v-model="newTaskTitle" placeholder="Task Title" />
        <button class="addTaskButton" @click="addNewTask(category.id)">Add Task</button>

        <ul class="taskList">
          <li
            v-for="task in category.tasks"
            :key="task.id"
            class="taskTitle"
            draggable="true"
            @dragstart="(event) => onDragStart(event, task, category.id)"
          >
            <input type="checkbox" v-model="task.completed" />
            <span v-if="editingTaskId !== task.id" @dblclick="startEditingTask(task.id)">
              <span :class="{ completed: task.completed }">{{ task.title }}</span>
            </span>
            <span v-else>
              <input
                type="text"
                v-model="task.title"
                @blur="saveTask(task.id)"
                @keydown.enter="saveTask(task.id)"
                @keydown.esc="cancelEditingTask()"
              />
            </span>
            <button class="taskDeletebutton" @click="deleteTask(category.id, task.id)">X</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conCategoryList {
  position: relative;
  align-content: left;
  left: -130px;
  width: 1475px;
  top: 80px;
  border: 2px solid white;
}

.categoryList {
  position: relative;
  width: 347px;
  height: 180px;
  background-color: #eadbc8;
  border: 1px solid black;
  margin: 10px;
  display: inline-flex;
  justify-content: left;
  align-items: top;
  text-align: left;
  overflow: hidden;
}

.catDelete {
  position: absolute;
  height: 22px;
  margin-left: 318px;
  padding-bottom: 1px;
  margin-top: 5px;
  border-radius: 5px;
  color: #293241;
  background-color: #ffc94a;
  border: 2px solid black;
  cursor: pointer;
}

.catDelete:hover {
  background-color: #ff8a08;
}

.categoryTitle {
  font-weight: bold;
  color: #293241;
  margin-left: 10px;
  width: auto;
  height: 25px;
  margin-right: 10px;
}

.editInput {
  width: 200px;
  height: 20px;
  margin-top: 5px;
  margin-left: 5px;
}

.taskCreate {
  position: absolute;
  margin-left: 5px;
  margin-top: 25px;
}

.addTaskButton {
  position: absolute;
  width: 70px;
  padding: 1px;
  margin-top: 2.8px;
  margin-left: 0px;
  color: #293241;
  background-color: #ffc94a;
  border-radius: 5px;
}

.addTaskButton:hover {
  background-color: #ff8a08;
}

.taskList {
  list-style-type: none;
  padding: 0;
  max-height: 120px;
  overflow-y: auto;
  scrollbar-width: none;
  margin-top: 2px;
}

.taskList .completed {
  text-decoration: line-through;
}

.taskList input[type='checkbox'] {
  margin-right: 10px;
  margin-left: 10px;
}

.taskTitle {
  top: 5px;
  height: 25px;
  padding-bottom: 2px;
  width: 400px;
  margin-left: 10px;
  color: #293241;
  background-color: transparent;
  padding: 1px;
  border-radius: 5px;
  margin-top: 2px;
  cursor: grab;
}

.taskTitle.dragging {
  background-color: #d3d3d3;
  opacity: 0.7;
}

.taskDeletebutton {
  background-color: #ffc94a;
  color: #293241;
  margin-left: 10px;
  width: 25px;
  height: 20px;
  margin-top: -2px;
}

.taskDeletebutton:hover {
  background-color: #ff8a08;
}
</style>
