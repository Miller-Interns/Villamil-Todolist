<script setup lang="ts">
import {
  categoriesList,
  deleteCategory,
  isEditingCategory,
  editableCategoryName,
  startEditingCategory,
  saveCategory,
  cancelEditing,
  newTaskTitle,
  addNewTask,
  editingTaskId,
  startEditingTask,
  saveTask,
  cancelEditingTask,
  deleteTask,
  onDrop,
  onDragOver,
  onDragStart
} from '@/stores/counter'
</script>

<template>
  <div class="conCategoryList">
    <div
      v-for="category in categoriesList"
      :key="category.id"
      class="categoryList"
      :data-category-id="category.id"
      @dragover="onDragOver"
      @drop="(event) => onDrop(event, category.id)"
    >
      <button class="catDelete" @click="deleteCategory(category.id)">X</button>
      <span class="categoryTitle" v-if="!isEditingCategory(category.id)"> {{ category.name }}</span>
      <input v-else v-model="editableCategoryName" class="editInput" />

      <button
        v-if="!isEditingCategory(category.id)"
        @click="startEditingCategory(category.id, category.name)"
        class="editButton"
      >
        Edit
      </button>

      <button
        v-if="isEditingCategory(category.id)"
        class="saveButton"
        @click="saveCategory(category.id)"
      >
        Save
      </button>
      <button v-if="isEditingCategory(category.id)" class="cancelButton" @click="cancelEditing">
        Cancel
      </button>

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
  position: absolute;
  align-content: left;
  left: 38px;
  top: 80px;
}

.categoryList {
  width: 450px;
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
  display: inline-flex;
  margin-left: 420px;
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

.editButton {
  position: absolute;
  display: inline-flex;
  margin-left: 380px;
  padding-bottom: 1px;
  margin-top: 5px;
  color: #293241;
  background-color: #ffc94a;
  cursor: pointer;
  border-radius: 5px;
}

.editButton:hover {
  background-color: #ff8a08;
}

.saveButton {
  position: absolute;
  display: inline-flex;
  margin-left: 310px;
  padding-bottom: 1px;
  margin-top: 5px;
  color: #293241;
  background-color: #ffc94a;
  cursor: pointer;
  border-radius: 5px;
}

.saveButton:hover {
  background-color: #ff8a08;
}

.cancelButton {
  position: absolute;
  display: inline-flex;
  margin-left: 360px;
  padding-bottom: 1px;
  margin-top: 5px;
  color: #293241;
  background-color: #ffc94a;
  cursor: pointer;
  border-radius: 5px;
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

.taskDetailVal {
  margin-left: 5px;
  margin-top: 1px;
  font-size: small;
  position: absolute;
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
