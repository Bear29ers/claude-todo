'use client'

import { useTodoStore } from '@/store/todoStore'

export function TodoStats() {
  const todos = useTodoStore((s) => s.todos)
  const clearCompleted = useTodoStore((s) => s.clearCompleted)

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  if (todos.length === 0) return null

  return (
    <div className="mt-4 flex items-center justify-between px-1">
      <span className="text-xs text-slate-400">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </span>
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-xs text-slate-400 transition-colors hover:text-slate-600"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  )
}
