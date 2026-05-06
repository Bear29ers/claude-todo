import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoStats } from '@/components/TodoStats'
import { useTodoStore } from '@/store/todoStore'
import { createTodo } from '../helpers'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoStats', () => {
  test('renders nothing when there are no todos', () => {
    const { container } = render(<TodoStats />)
    expect(container).toBeEmptyDOMElement()
  })

  test('shows singular "task" when 1 active todo remains', () => {
    useTodoStore.setState({ todos: [createTodo()] })
    render(<TodoStats />)
    expect(screen.getByText('1 task remaining')).toBeInTheDocument()
  })

  test('shows plural "tasks" when multiple active todos remain', () => {
    useTodoStore.setState({ todos: [createTodo(), createTodo()] })
    render(<TodoStats />)
    expect(screen.getByText('2 tasks remaining')).toBeInTheDocument()
  })

  test('shows "0 tasks remaining" when all todos are completed', () => {
    useTodoStore.setState({
      todos: [createTodo({ completed: true }), createTodo({ completed: true })],
    })
    render(<TodoStats />)
    expect(screen.getByText('0 tasks remaining')).toBeInTheDocument()
  })

  test('does not show "Clear completed" when no todos are completed', () => {
    useTodoStore.setState({ todos: [createTodo()] })
    render(<TodoStats />)
    expect(screen.queryByText(/Clear completed/)).not.toBeInTheDocument()
  })

  test('shows "Clear completed" with count when there are completed todos', () => {
    useTodoStore.setState({
      todos: [createTodo({ completed: true }), createTodo({ completed: true }), createTodo()],
    })
    render(<TodoStats />)
    expect(screen.getByText('Clear completed (2)')).toBeInTheDocument()
  })

  test('removes completed todos when "Clear completed" is clicked', async () => {
    const user = userEvent.setup()
    useTodoStore.setState({
      todos: [
        createTodo({ id: 'active-1' }),
        createTodo({ id: 'done-1', completed: true }),
        createTodo({ id: 'done-2', completed: true }),
      ],
    })
    render(<TodoStats />)

    await user.click(screen.getByText('Clear completed (2)'))

    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(1)
    expect(todos[0].id).toBe('active-1')
  })
})
