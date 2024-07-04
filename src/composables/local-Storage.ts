import { reactive, watch } from 'vue'

export function useLocalStorage<T extends object>(key: string, initialValue: T): T {
  const data = reactive(initialValue) as T

  const storedData = window.localStorage.getItem(key)
  if (storedData) {
    Object.assign(data, JSON.parse(storedData))
  }

  watch(
    () => data,
    (newValue) => {
      window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return data
}
