const TODOS_KEY = 'email'

export const getLocalEmail = () => JSON.parse(localStorage.getItem(TODOS_KEY) || '')

export const addTodo = (todo) => {
  const local = getLocalEmail()

  local.addTodo(todo)

  localStorage.setItem(TODOS_KEY, JSON.stringify(local))
}