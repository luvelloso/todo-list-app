import type { Task } from '../types/task'

const TASKS_KEY      = 'todo:tasks'
const ONBOARDED_KEY  = 'todo:onboarded'

export function getTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function getOnboarded(): boolean {
  return localStorage.getItem(ONBOARDED_KEY) === 'true'
}

export function setOnboarded(): void {
  localStorage.setItem(ONBOARDED_KEY, 'true')
}