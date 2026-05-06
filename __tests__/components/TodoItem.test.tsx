import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from '@/components/TodoItem'
import { useTodoStore } from '@/store/todoStore'
import { createTodo } from '../helpers'

beforeEach(() => {
  useTodoStore.setState({ todos: [], filter: 'all' })
})

describe('TodoItem', () => {
  test('renders the todo title', () => {
    const todo = createTodo({ title: 'Walk the dog' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  test('shows the low priority dot with emerald color', () => {
    const todo = createTodo({ priority: 'low' })
    useTodoStore.setState({ todos: [todo] })
    const { container } = render(<TodoItem todo={todo} />)
    const dot = container.querySelector('.bg-emerald-400')
    expect(dot).toBeInTheDocument()
  })

  test('shows the medium priority dot with amber color', () => {
    const todo = createTodo({ priority: 'medium' })
    useTodoStore.setState({ todos: [todo] })
    const { container } = render(<TodoItem todo={todo} />)
    const dot = container.querySelector('.bg-amber-400')
    expect(dot).toBeInTheDocument()
  })

  test('shows the high priority dot with rose color', () => {
    const todo = createTodo({ priority: 'high' })
    useTodoStore.setState({ todos: [todo] })
    const { container } = render(<TodoItem todo={todo} />)
    const dot = container.querySelector('.bg-rose-400')
    expect(dot).toBeInTheDocument()
  })

  test('clicking the toggle button toggles the todo completion state', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'toggle-test', completed: false })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(useTodoStore.getState().todos[0].completed).toBe(true)
  })

  test('shows checkmark SVG when todo is completed', () => {
    const todo = createTodo({ completed: true })
    useTodoStore.setState({ todos: [todo] })
    const { container } = render(<TodoItem todo={todo} />)
    expect(container.querySelector('svg path[d="M2 6l3 3 5-5"]')).toBeInTheDocument()
  })

  test('toggle button label changes based on completion state', () => {
    const completedTodo = createTodo({ completed: true })
    useTodoStore.setState({ todos: [completedTodo] })
    const { rerender } = render(<TodoItem todo={completedTodo} />)
    expect(screen.getByRole('button', { name: 'Mark incomplete' })).toBeInTheDocument()

    const activeTodo = createTodo({ completed: false })
    rerender(<TodoItem todo={activeTodo} />)
    expect(screen.getByRole('button', { name: 'Mark complete' })).toBeInTheDocument()
  })

  test('clicking the delete button removes the todo from the store', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'delete-test' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.click(screen.getByRole('button', { name: 'Delete task' }))
    expect(useTodoStore.getState().todos).toHaveLength(0)
  })

  test('double-clicking the title of an active todo enters edit mode', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ title: 'Original title' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.dblClick(screen.getByText('Original title'))
    expect(screen.getByDisplayValue('Original title')).toBeInTheDocument()
  })

  test('pressing Enter in edit mode commits a changed title', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'edit-enter', title: 'Original title' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.dblClick(screen.getByText('Original title'))
    const input = screen.getByDisplayValue('Original title')
    await user.clear(input)
    await user.type(input, 'Updated title')
    await user.keyboard('{Enter}')

    // Store is updated with the new title
    expect(useTodoStore.getState().todos[0].title).toBe('Updated title')
    // Edit mode is exited (the input is gone)
    expect(screen.queryByDisplayValue('Updated title')).not.toBeInTheDocument()
  })

  test('pressing Enter in edit mode with unchanged title does not modify the store', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'edit-unchanged', title: 'Same title' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    const todosBefore = useTodoStore.getState().todos
    await user.dblClick(screen.getByText('Same title'))
    await user.keyboard('{Enter}')

    // If updateTodo had been called, Zustand would produce a new todos array via map
    expect(useTodoStore.getState().todos).toBe(todosBefore)
  })

  test('pressing Escape in edit mode reverts to the original title without saving', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'edit-escape', title: 'Original title' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.dblClick(screen.getByText('Original title'))
    const input = screen.getByDisplayValue('Original title')
    await user.clear(input)
    await user.type(input, 'Discarded change')
    await user.keyboard('{Escape}')

    expect(useTodoStore.getState().todos[0].title).toBe('Original title')
    expect(screen.getByText('Original title')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('Discarded change')).not.toBeInTheDocument()
  })

  test('blurring the edit input commits a changed title', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ id: 'edit-blur', title: 'Original title' })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.dblClick(screen.getByText('Original title'))
    const input = screen.getByDisplayValue('Original title')
    await user.clear(input)
    await user.type(input, 'Blur committed')
    await user.tab()

    expect(useTodoStore.getState().todos[0].title).toBe('Blur committed')
  })

  test('double-clicking a completed todo title does not enter edit mode', async () => {
    const user = userEvent.setup()
    const todo = createTodo({ title: 'Done task', completed: true })
    useTodoStore.setState({ todos: [todo] })
    render(<TodoItem todo={todo} />)

    await user.dblClick(screen.getByText('Done task'))
    expect(screen.queryByDisplayValue('Done task')).not.toBeInTheDocument()
  })
})
