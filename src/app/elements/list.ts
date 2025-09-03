import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Todo } from '../../types/Todo'

let initID = "ui_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

const existingCookie = document.cookie
  .split("; ")
  .find((c) => c.startsWith("user_id="));

if (existingCookie) {
  initID = existingCookie.split("=")[1];
} else {
  document.cookie = `user_id=${initID}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

const storageKey = `list_${initID}`;

// initial state object
const initTodos: Todo[] = localStorage.getItem(storageKey)
  ? JSON.parse(localStorage.getItem(storageKey) as string) // parse stored todos
  : [
      { id: 1, desc: 'Buy milk', completed: false, date: new Date('2004-10-12').toISOString() },
      { id: 2, desc: 'Buy water', completed: true, date: new Date('2004-10-12').toISOString() }
    ];

const tasksSlice = createSlice({
  name: 'tasks',
  //   assign initial state
  initialState: initTodos,
  //   action holder
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        desc: action.payload,
        completed: false,
        date: new Date().toISOString(),
      }
      state.push(newTodo)
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    markTaskDone: (state, action: PayloadAction<number>) => {
      const task = state.find((el) => el.id === action.payload)
      if (task) task.completed = true
      
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    markTaskTodo: (state, action: PayloadAction<number>) => {
      const task = state.find((el) => el.id === action.payload)
      if (task) task.completed = false

      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    clearCompletedTasks: (state) => {
      const result = state.filter((el) => !el.completed);

      localStorage.setItem(storageKey, JSON.stringify(result));

      return result

    },
  },
})

export const { addTask, markTaskDone, markTaskTodo, clearCompletedTasks } = tasksSlice.actions
export default tasksSlice.reducer