'use client'

import { useEffect } from 'react'
import { useTodoStore } from '@/store/todoStore'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { TodoFilters } from './TodoFilters'
import { TodoStats } from './TodoStats'

export function TodoApp() {
  useEffect(() => {
    useTodoStore.persist.rehydrate()
  }, [])

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 pt-16 pb-24">
      <main className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-200">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">My Tasks</h1>
          <p className="mt-1 text-sm text-slate-400">Stay organized, stay focused</p>
        </div>

        {/* Input */}
        <TodoInput />

        {/* Filters */}
        <div className="mb-4">
          <TodoFilters />
        </div>

        {/* List */}
        <TodoList />

        {/* Stats / Clear */}
        <TodoStats />
      </main>
    </div>
  )
}
