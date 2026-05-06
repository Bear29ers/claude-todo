import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoInput } from '@/components/TodoInput'
import { useTodoStore } from '@/store/todoStore'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoInput', () => {
  test('renders the text input and Add button', () => {
    render(<TodoInput />)
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  test('Add button is disabled when the input is empty', () => {
    render(<TodoInput />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('Add button is disabled when the input contains only whitespace', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.type(screen.getByPlaceholderText('Add a new task...'), '   ')
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('Add button becomes enabled when the input has non-whitespace content', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Buy milk')
    expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled()
  })

  test('submitting adds a todo with the trimmed title and default medium priority', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.type(screen.getByPlaceholderText('Add a new task...'), '  Buy milk  ')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(1)
    expect(todos[0].title).toBe('Buy milk')
    expect(todos[0].priority).toBe('medium')
    expect(todos[0].completed).toBe(false)
  })

  test('clears the input after a successful submit', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(input).toHaveValue('')
  })

  test('does not add a todo when the input is only whitespace on submit', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.type(screen.getByPlaceholderText('Add a new task...'), '   ')
    await user.keyboard('{Enter}')
    expect(useTodoStore.getState().todos).toHaveLength(0)
  })

  test('submits with low priority when Low priority button is selected', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.click(screen.getByTitle('Low priority'))
    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Low priority task')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(useTodoStore.getState().todos[0].priority).toBe('low')
  })

  test('submits with high priority when High priority button is selected', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.click(screen.getByTitle('High priority'))
    await user.type(screen.getByPlaceholderText('Add a new task...'), 'High priority task')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(useTodoStore.getState().todos[0].priority).toBe('high')
  })

  test('pressing Enter in the input submits the form', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Press Enter task')
    await user.keyboard('{Enter}')
    expect(useTodoStore.getState().todos).toHaveLength(1)
    expect(useTodoStore.getState().todos[0].title).toBe('Press Enter task')
  })
})
