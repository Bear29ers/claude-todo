import type { Metadata } from 'next'
import { TodoApp } from '@/components/TodoApp'

export const metadata: Metadata = {
  title: 'My Tasks',
  description: 'A clean, minimal todo app',
}

export default function Home() {
  return <TodoApp />
}
