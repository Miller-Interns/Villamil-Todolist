import { ref } from 'vue'
import { categoryList } from './category-Creation'

const charLength = 30
export const newTaskTitle = ref('')
export const editingTaskId = ref<number | null>(null)

function idGeneration() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export function addNewTask(categoryId: number) {
  if (newTaskTitle.value.trim() === '') {
    alert('Task Title is empty')
    return
  }

  const char = newTaskTitle.value.trim().length
  if (char > charLength) {
    alert('The Task name cannot exceed 30 characters')
    newTaskTitle.value = ''
    return
  }

  const category = categoryList.value.find((category) => category.id === categoryId)
  if (category) {
    category.tasks.push({
      id: idGeneration(),
      title: newTaskTitle.value.trim(),
      completed: false
    })
  }

  newTaskTitle.value = ''
}

export function deleteTask(categoryId: number, taskId: number) {
  const category = categoryList.value.find((category) => category.id === categoryId)
  if (category) {
    const taskIndex = category.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      category.tasks.splice(taskIndex, 1)
    }
  }
}

export function startEditingTask(taskId: number) {
  editingTaskId.value = taskId
}

export function saveTask(taskId: number) {
  const category = categoryList.value.find((category) =>
    category.tasks.some((tasks) => tasks.id === taskId)
  )
  if (!category) {
    return
  }

  const task = category.tasks.find((task) => task.id === taskId)
  if (!task) {
    return
  }

  if (task.title.trim() === '') {
    alert('Task Title cannot be empty')
    return
  }

  const char = task.title.trim().length
  if (char > charLength) {
    alert('The Task name cannot exceed 30 characters')
    return
  }

  editingTaskId.value = null
}

export function cancelEditingTask() {
  editingTaskId.value = null
}
