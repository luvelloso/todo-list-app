export type CategoryId = 'design' | 'personal' | 'house' | 'work' | 'health'

export interface Category {
  id: CategoryId
  label: string
}

export interface Task {
  id: string
  text: string
  description?: string
  categoryId: CategoryId
  completed: boolean
  createdAt: string,
  updatedAt?: string,
  scheduledDate: string
}
