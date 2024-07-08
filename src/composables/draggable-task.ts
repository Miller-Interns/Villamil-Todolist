import { ref } from 'vue'
import { categoryList } from './category-creation'
import type { draggedTask } from '@/types/drag-variables'

export const taskDragging = ref<draggedTask | null>(null)

function moveTaskToCategory(taskId: number, fromCategoryId: number, toCategoryId: number) {
  const fromCategory = categoryList.value.find((category) => category.id === fromCategoryId)
  const toCategory = categoryList.value.find((category) => category.id === toCategoryId)

  if (fromCategory && toCategory) {
    const taskIndex = fromCategory.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      const [task] = fromCategory.tasks.splice(taskIndex, 1)
      toCategory.tasks.push(task)
    }
  }
}

export function onDrop(event: DragEvent, toCategoryId: number) {
  event.preventDefault()

  const data = event.dataTransfer?.getData('text/plain')
  if (data) {
    const parsedData = JSON.parse(data)
    const { task, fromcategoryId } = parsedData

    if (fromcategoryId && fromcategoryId !== toCategoryId) {
      moveTaskToCategory(task.id, fromcategoryId, toCategoryId)
    }
  }
}

export function onDragOver(event: DragEvent) {
  event.preventDefault()
}

export function onDragStart(event: DragEvent, task: any, categoryId: number) {
  const transferData = JSON.stringify(taskDragging.value)
  taskDragging.value = { task, fromcategoryId: categoryId }
  event.dataTransfer?.setData('text/plain', transferData)
}
