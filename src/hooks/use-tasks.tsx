import { useState, useCallback, useRef } from 'react'
import type { Task, CategoryId } from '../types/task'
import { createTodo, getTodos, deleteTodo, updateTodoStatus } from '../services/api'
import type { Todo as ApiTodo } from '../services/api'
import { getTasks, saveTasks } from '../lib/storage'
import { DEFAULT_CATEGORY_ID } from '../lib/constants'

export function useTasks(initialTasks?: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (initialTasks && initialTasks.length > 0) return initialTasks
    return getTasks()
  })
  const loadedDates = useRef<Set<string>>(new Set())

  const persist = useCallback((updated: Task[]) => {
    setTasks(updated)
    saveTasks(updated)
  }, [])

  async function addTask(
    text: string,
    categoryId: CategoryId,
    scheduledDate: string,
    description?: string
  ) {
    const todo = await createTodo(text, categoryId, 'pending', scheduledDate, description)

    const task: Task = {
      id: String(todo.id),
      text,
      description: todo.description ?? undefined,
      categoryId,
      completed: todo.status === 'completed',
      createdAt: todo.created_at,
      scheduledDate,
    }

    persist([...tasks, task])
  }

  const loadTasksForDate = useCallback(async (date: string) => {
    if (loadedDates.current.has(date)) return

    try {
      const todos = await getTodos(undefined, date)
      if (!Array.isArray(todos)) return
      const mapped = (todos as ApiTodo[]).map((t) => ({
        id: String(t.id),
        text: t.title,
        description: t.description ?? undefined,
        categoryId: DEFAULT_CATEGORY_ID,
        completed: t.status === 'completed',
        createdAt: t.created_at,
        scheduledDate: t.scheduled_date ?? t.created_at,
      }))

      setTasks((currentTasks) => {
        const taskById = new Map(currentTasks.map((task) => [task.id, task]))
        mapped.forEach((task) => taskById.set(task.id, task))
        const merged = Array.from(taskById.values())
        saveTasks(merged)
        return merged
      })
      loadedDates.current.add(date)
    } catch {
      return
    }
  }, [])

  async function toggleTask(id: string) {
    const prev = tasks
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    persist(updated)

    if (/^\d+$/.test(id)) {
      const todoId = Number(id)
      const task = updated.find((t) => t.id === id)
      if (!task) return

      try {
        await updateTodoStatus(todoId, task.completed ? 'completed' : 'pending')
      } catch {
        persist(prev)
      }
    }
  }

  function deleteTask(id: string) {
    const prev = tasks
    const updated = tasks.filter((t) => t.id !== id)
    persist(updated)
    if (/^\d+$/.test(id)) {
      const nid = Number(id)
      deleteTodo(nid)
        .catch(() => {
          persist(prev)
        })
    }
  }

  return { tasks, addTask, toggleTask, deleteTask, loadTasksForDate }
}
