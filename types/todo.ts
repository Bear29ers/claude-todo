export type Priority = 'low' | 'medium' | 'high'
export type FilterType = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: string
}
