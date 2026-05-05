'use client'

import { useState } from 'react'
import { useTodoStore } from '@/store/todoStore'
import { Priority } from '@/types/todo'

const PRIORITIES: { value: Priority; label: string; active: string; inactive: string }[] = [
  {
    value: 'low',
    label: 'Low priority',
    active: 'text-emerald-500 bg-emerald-50 ring-2 ring-emerald-200',
    inactive: 'text-slate-300 hover:text-emerald-400',
  },
  {
    value: 'medium',
    label: 'Medium priority',
    active: 'text-amber-500 bg-amber-50 ring-2 ring-amber-200',
    inactive: 'text-slate-300 hover:text-amber-400',
  },
  {
    value: 'high',
    label: 'High priority',
    active: 'text-rose-500 bg-rose-50 ring-2 ring-rose-200',
    inactive: 'text-slate-300 hover:text-rose-400',
  },
]

export function TodoInput() {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addTodo(trimmed, priority)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          autoFocus
        />
        <div className="flex items-center gap-1.5 border-l border-slate-100 pl-3">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              title={p.label}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] transition-all ${
                priority === p.value ? p.active : p.inactive
              }`}
            >
              ●
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add
      </button>
    </form>
  )
}
