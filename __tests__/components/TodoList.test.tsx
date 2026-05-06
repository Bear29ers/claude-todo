import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodoList } from '@/components/TodoList'
import { useTodoStore } from '@/store/todoStore'
import { createTodo } from '../helpers'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoList', () => {
  test('shows empty state prompt when there are no todos', () => {
    render(<TodoList />)
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument()
    expect(screen.getByText('Add your first task above to get started.')).toBeInTheDocument()
  })

  test('shows "No active tasks" message when filter is active but all todos are completed', () => {
    useTodoStore.setState({
      todos: [createTodo({ completed: true })],
      filter: 'active',
    })
    render(<TodoList />)
    expect(screen.getByText('No active tasks.')).toBeInTheDocument()
  })

  test('shows "No completed tasks" message when filter is completed but no todos are done', () => {
    useTodoStore.setState({
      todos: [createTodo({ completed: false })],
      filter: 'completed',
    })
    render(<TodoList />)
    expect(screen.getByText('No completed tasks.')).toBeInTheDocument()
  })

  test('shows all todos when filter is "all"', () => {
    useTodoStore.setState({
      todos: [
        createTodo({ title: 'Active task', completed: false }),
        createTodo({ title: 'Done task', completed: true }),
      ],
      filter: 'all',
    })
    render(<TodoList />)
    expect(screen.getByText('Active task')).toBeInTheDocument()
    expect(screen.getByText('Done task')).toBeInTheDocument()
  })

  test('shows only incomplete todos when filter is "active"', () => {
    useTodoStore.setState({
      todos: [
        createTodo({ title: 'Active task', completed: false }),
        createTodo({ title: 'Done task', completed: true }),
      ],
      filter: 'active',
    })
    render(<TodoList />)
    expect(screen.getByText('Active task')).toBeInTheDocument()
    expect(screen.queryByText('Done task')).not.toBeInTheDocument()
  })

  test('shows only completed todos when filter is "completed"', () => {
    useTodoStore.setState({
      todos: [
        createTodo({ title: 'Active task', completed: false }),
        createTodo({ title: 'Done task', completed: true }),
      ],
      filter: 'completed',
    })
    render(<TodoList />)
    expect(screen.queryByText('Active task')).not.toBeInTheDocument()
    expect(screen.getByText('Done task')).toBeInTheDocument()
  })

  test('renders a TodoItem for each matching todo', () => {
    useTodoStore.setState({
      todos: [
        createTodo({ title: 'Task A' }),
        createTodo({ title: 'Task B' }),
        createTodo({ title: 'Task C' }),
      ],
      filter: 'all',
    })
    render(<TodoList />)
    expect(screen.getByText('Task A')).toBeInTheDocument()
    expect(screen.getByText('Task B')).toBeInTheDocument()
    expect(screen.getByText('Task C')).toBeInTheDocument()
  })
})
