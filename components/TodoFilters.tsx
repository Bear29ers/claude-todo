'use client'

import { useTodoStore } from '@/store/todoStore'
import { FilterType } from '@/types/todo'

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function TodoFilters() {
  const filter = useTodoStore((s) => s.filter)
  const setFilter = useTodoStore((s) => s.setFilter)
  const todos = useTodoStore((s) => s.todos)

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 px-3 text-sm font-medium transition-all ${
            filter === f.value
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {f.label}
          <span
            className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
              filter === f.value
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  )
}
