import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { useTodoStore } from '@/store/todoStore'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('Home page', () => {
  test('renders the "My Tasks" heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'My Tasks' })).toBeInTheDocument()
  })

  test('renders the task input', () => {
    render(<Home />)
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
  })
})
