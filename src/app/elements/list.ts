import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Todo } from '../../types/Todo'

const initTodos: Todo[] = [
  { id: 1, desc: 'Buy milk', completed: false, date: new Date('2004-10-12').toISOString() },
  { id: 2, desc: 'Buy water', completed: true, date: new Date('2004-10-12').toISOString() }
]

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initTodos,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        desc: action.payload,
        completed: false,
        date: new Date().toISOString(),
      }
      state.push(newTodo)
    },
    markTaskDone: (state, action: PayloadAction<number>) => {
      const task = state.find((el) => el.id === action.payload)
      if (task) task.completed = true
    },
    markTaskTodo: (state, action: PayloadAction<number>) => {
      const task = state.find((el) => el.id === action.payload)
      if (task) task.completed = false
    },
    clearCompletedTasks: (state) => {
      return state.filter((el) => !el.completed)
    },
  },
})

export const { addTask, markTaskDone, markTaskTodo, clearCompletedTasks } = tasksSlice.actions
export default tasksSlice.reducer