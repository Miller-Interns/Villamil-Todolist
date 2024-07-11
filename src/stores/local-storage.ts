import { watch } from 'vue'
import { categoryList } from '../composables/category-creation'

export const useStorage = () => {
  const storedList = window.localStorage.getItem('categoryList')

  if (storedList) {
    categoryList.value = JSON.parse(storedList)
  }

  watch(
    categoryList,
    (val) => {
      window.localStorage.setItem('categoryList', JSON.stringify(val))
    },
    { deep: true }
  )
}
