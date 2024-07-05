export type categoriesList = {
  id: number
  name: string
  tasks: task[]
}

export type task = {
  id: number
  title: string
  completed: boolean
}
