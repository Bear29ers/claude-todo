'use client'

import { useEffect, useRef, useState } from 'react'
import { useTodoStore } from '@/store/todoStore'
import { Todo } from '@/types/todo'

const PRIORITY_DOT: Record<Todo['priority'], string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
}

export function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)
  const updateTodo = useTodoStore((s) => s.updateTodo)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const commitEdit = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== todo.title) {
      updateTodo(todo.id, trimmed)
    } else {
      setEditValue(todo.title)
    }
    setIsEditing(false)
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all ${
        todo.completed
          ? 'border-slate-100 bg-slate-50/60 opacity-60'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Priority indicator */}
      <span
        className={`h-2 w-2 flex-shrink-0 rounded-full ${PRIORITY_DOT[todo.priority]}`}
      />

      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          todo.completed
            ? 'border-indigo-400 bg-indigo-400 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Title / Edit input */}
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit()
            if (e.key === 'Escape') {
              setEditValue(todo.title)
              setIsEditing(false)
            }
          }}
          className="flex-1 bg-transparent text-sm text-slate-800 outline-none border-b border-indigo-400"
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setIsEditing(true)}
          className={`flex-1 select-none text-sm ${
            todo.completed
              ? 'text-slate-400 line-through'
              : 'cursor-text text-slate-700'
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Delete */}
      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete task"
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
