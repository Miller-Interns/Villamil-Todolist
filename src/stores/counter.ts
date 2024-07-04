import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

import { useLocalStorage } from '@/composables/local-Storage'
import type { DraggedTask } from '@/Interface/drag-Interface'

const charLength = 30
export const newCategoryName = ref('')
export const editableCategoryName = ref('')
export const newTaskTitle = ref('')
export const categoriesList = reactive<
  {
    id: number
    name: string
    tasks: {
      id: number
      title: string
      completed: boolean
    }[]
  }[]
>([])

export const toSaveList = useLocalStorage('listOfCategories', categoriesList)

export const editingCategoryId = ref<number | null>(null)
export const editingTaskId = ref<number | null>(null)
export const statusShowCat = ref(false)

export const idGeneration = () => {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export const isDuplicate = (name: string) => {
  return categoriesList.some((category) => category.name.toLowerCase() === name.toLowerCase())
}

export const addNewCategory = () => {
  if (newCategoryName.value.trim() === '') {
    alert('Category name is empty')
  }
  if (isDuplicate(newCategoryName.value)) {
    alert('Category name is already existing')
    newCategoryName.value = ''
    return
  }

  const char = newCategoryName.value.trim().length
  if (char > charLength) {
    alert('The Task name cannot exceed 30 characters')
    newCategoryName.value = ''
    return
  }

  categoriesList.push({
    id: idGeneration(),
    name: newCategoryName.value.trim(),
    tasks: []
  })

  newCategoryName.value = ''
}

export const addNewTask = (categoryId: number) => {
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

  const category = categoriesList.find((category) => category.id === categoryId)
  if (category) {
    category.tasks.push({
      id: idGeneration(),
      title: newTaskTitle.value.trim(),
      completed: false
    })
  }

  newTaskTitle.value = ''
}

export const deleteTask = (categoryId: number, taskId: number) => {
  const category = categoriesList.find((category) => category.id === categoryId)
  if (category) {
    const taskIndex = category.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      category.tasks.splice(taskIndex, 1)
    }
  }
}

export const startEditingCategory = (id: number, name: string) => {
  editingCategoryId.value = id

  const char = name.trim().length
  if (char > charLength) {
    alert('The Task name cannot exceed 30 characters')
    name = ''
    return
  }
  editableCategoryName.value = name
}

export const startEditingTask = (taskId: number) => {
  editingTaskId.value = taskId
}

export const saveTask = (taskId: number) => {
  const category = categoriesList.find((category) =>
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

export const isEditingCategory = (id: number) => {
  return editingCategoryId.value === id
}

export const saveCategory = (id: number) => {
  if (editableCategoryName.value.trim() === '') {
    alert('Category name is empty')
    return
  }

  if (isDuplicate(editableCategoryName.value)) {
    alert('Category name is already existing')
    return
  }

  const category = categoriesList.find((category) => category.id === id)
  if (category) {
    category.name = editableCategoryName.value.trim()
  }

  cancelEditing()
}

export const cancelEditing = () => {
  editingCategoryId.value = null
  editableCategoryName.value = ''
}

export const cancelEditingTask = () => {
  editingTaskId.value = null
}

export const deleteCategory = (id: number) => {
  const index = categoriesList.findIndex((category) => category.id === id)
  if (index !== -1) {
    categoriesList.splice(index, 1)
  }

  cancelEditing()
}

const moveTaskToCategory = (taskId: number, fromCategoryId: number, toCategoryId: number) => {
  const fromCategory = categoriesList.find((category) => category.id === fromCategoryId)
  const toCategory = categoriesList.find((category) => category.id === toCategoryId)

  if (fromCategory && toCategory) {
    const taskIndex = fromCategory.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      const [task] = fromCategory.tasks.splice(taskIndex, 1)
      toCategory.tasks.push(task)
    }
  }
}

export const onDrop = (event: DragEvent, toCategoryId: number) => {
  event.preventDefault()
  const data = event.dataTransfer?.getData('text/plain')
  if (data) {
    const { task, fromCategoryId } = JSON.parse(data)
    if (fromCategoryId !== toCategoryId) {
      moveTaskToCategory(task.id, fromCategoryId, toCategoryId)
    }
  }
}

export const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

export const onDragStart = (event: DragEvent, task: any, categoryId: number) => {
  draggedTask.value = { task, fromCategoryId: categoryId }
  event.dataTransfer?.setData('text/plain', JSON.stringify(draggedTask.value))
}

export const draggedTask = ref<DraggedTask | null>(null)
