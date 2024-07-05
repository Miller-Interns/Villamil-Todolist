import { ref } from 'vue'
import type { categoriesList } from '@/types/types'

const charLength = 30
function idGeneration() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export const statusShowCategory = ref(false)

export const newCategoryName = ref('')
export const editableCategoryName = ref('')
export const categoryList = ref<categoriesList[]>([])
export const editingCategoryId = ref<number | null>(null)

export function isDuplicate(name: string) {
  return categoryList.value.some((category) => category.name.toLowerCase() === name.toLowerCase())
}

export function addNewCategory() {
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

  categoryList.value.push({
    id: idGeneration(),
    name: newCategoryName.value.trim(),
    tasks: []
  })

  newCategoryName.value = ''
}

export function startEditingCategory(id: number, name: string) {
  editingCategoryId.value = id

  const char = name.trim().length
  if (char > charLength) {
    alert('The Task name cannot exceed 30 characters')
    name = ''
    return
  }
  editableCategoryName.value = name
}

export function isEditingCategory(id: number) {
  return editingCategoryId.value === id
}

export function saveCategory(id: number) {
  if (editableCategoryName.value.trim() === '') {
    alert('Category name is empty')
    return
  }

  if (isDuplicate(editableCategoryName.value)) {
    alert('Category name is already existing')
    return
  }

  const category = categoryList.value.find((category) => category.id === id)
  if (category) {
    category.name = editableCategoryName.value.trim()
  }

  canceleditingCategory()
}
export function canceleditingCategory() {
  editingCategoryId.value = null
  editableCategoryName.value = ''
}

export function deleteCategory(id: number) {
  const index = categoryList.value.findIndex((category) => category.id === id)
  if (index !== -1) {
    categoryList.value.splice(index, 1)
  }

  canceleditingCategory()
}
