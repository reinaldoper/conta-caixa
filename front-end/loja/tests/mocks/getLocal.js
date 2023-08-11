
const TODOS_KEY = 'token'

export const getLocal = () => JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')

export const addTodo = (todo) => {
  const local = getLocal()

  local.push(todo)

  localStorage.setItem(TODOS_KEY, JSON.stringify(local))
}