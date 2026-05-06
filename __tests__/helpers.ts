import { Todo } from '@/types/todo'

let idCounter = 0

export function createTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: `todo-${++idCounter}`,
    title: 'Test task',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}
