import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo, FilterType, Priority } from '@/types/todo'

interface TodoStore {
  todos: Todo[]
  filter: FilterType
  addTodo: (title: string, priority: Priority) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, title: string) => void
  setFilter: (filter: FilterType) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',

      addTodo: (title, priority) =>
        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
              priority,
              createdAt: new Date().toISOString(),
            },
            ...state.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      updateTodo: (id, title) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title } : todo
          ),
        })),

      setFilter: (filter) => set({ filter }),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'claude-todo-storage',
      skipHydration: true,
    }
  )
)
