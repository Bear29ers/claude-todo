import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoFilters } from '@/components/TodoFilters'
import { useTodoStore } from '@/store/todoStore'
import { createTodo } from '../helpers'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoFilters', () => {
  test('renders All, Active, and Completed filter buttons', () => {
    render(<TodoFilters />)
    expect(screen.getByRole('button', { name: /All/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Active/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Completed/ })).toBeInTheDocument()
  })

  test('shows correct counts for each filter', () => {
    useTodoStore.setState({
      todos: [
        createTodo({ completed: false }),
        createTodo({ completed: false }),
        createTodo({ completed: true }),
      ],
    })
    render(<TodoFilters />)

    const allButton = screen.getByRole('button', { name: /All/ })
    const activeButton = screen.getByRole('button', { name: /Active/ })
    const completedButton = screen.getByRole('button', { name: /Completed/ })

    expect(allButton).toHaveTextContent('3')
    expect(activeButton).toHaveTextContent('2')
    expect(completedButton).toHaveTextContent('1')
  })

  test('clicking a filter button updates the active filter in the store', async () => {
    const user = userEvent.setup()
    render(<TodoFilters />)

    await user.click(screen.getByRole('button', { name: /Active/ }))
    expect(useTodoStore.getState().filter).toBe('active')

    await user.click(screen.getByRole('button', { name: /Completed/ }))
    expect(useTodoStore.getState().filter).toBe('completed')

    await user.click(screen.getByRole('button', { name: /All/ }))
    expect(useTodoStore.getState().filter).toBe('all')
  })

  test('the currently active filter button has highlighted styling', () => {
    useTodoStore.setState({ filter: 'active' })
    render(<TodoFilters />)

    const activeButton = screen.getByRole('button', { name: /Active/ })
    expect(activeButton).toHaveClass('bg-white')
    expect(activeButton).toHaveClass('text-slate-800')
  })
})
