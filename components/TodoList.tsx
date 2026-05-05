'use client'

import { useMemo } from 'react'
import { useTodoStore } from '@/store/todoStore'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const todos = useTodoStore((s) => s.todos)
  const filter = useTodoStore((s) => s.filter)

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="mb-3 text-5xl">📋</div>
        <p className="text-sm font-medium">No tasks yet.</p>
        <p className="mt-1 text-xs">Add your first task above to get started.</p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <p className="text-sm font-medium">No {filter} tasks.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
