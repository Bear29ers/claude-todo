import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodoApp } from '@/components/TodoApp'
import { useTodoStore } from '@/store/todoStore'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoApp', () => {
  test('renders the main heading', () => {
    render(<TodoApp />)
    expect(screen.getByRole('heading', { name: 'My Tasks' })).toBeInTheDocument()
  })

  test('renders the subheading', () => {
    render(<TodoApp />)
    expect(screen.getByText('Stay organized, stay focused')).toBeInTheDocument()
  })

  test('renders the task input field', () => {
    render(<TodoApp />)
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
  })

  test('renders the filter buttons', () => {
    render(<TodoApp />)
    expect(screen.getByRole('button', { name: /All/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Active/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Completed/ })).toBeInTheDocument()
  })

  test('renders the empty todo list state', () => {
    render(<TodoApp />)
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument()
  })

  test('calls persist.rehydrate on mount', () => {
    const rehydrateSpy = vi.spyOn(useTodoStore.persist, 'rehydrate')
    render(<TodoApp />)
    expect(rehydrateSpy).toHaveBeenCalledOnce()
    rehydrateSpy.mockRestore()
  })
})
