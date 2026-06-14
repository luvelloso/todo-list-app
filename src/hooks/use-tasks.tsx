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

  async function addTask(text: string, categoryId: CategoryId, scheduledDate: string) {
    try {
      console.log('useTasks.addTask -> creating', { text, categoryId, scheduledDate })
      const todo = await createTodo(text, categoryId, 'pending', scheduledDate)
      console.log('useTasks.addTask -> created remote todo', todo)

      const task: Task = {
        id: String(todo.id),
        text,
        categoryId,
        completed: todo.status === 'completed',
        createdAt: todo.created_at,
        scheduledDate,
      }

      persist([...tasks, task])
    } catch (error) {
      console.error('Failed to create todo', error)
      throw error
    }
  }

  const loadTasksForDate = useCallback(async (date: string) => {
    if (loadedDates.current.has(date)) return

    try {
      const todos = await getTodos(undefined, date)
      if (!Array.isArray(todos)) return
      const mapped = (todos as ApiTodo[]).map((t) => ({
        id: String(t.id),
        text: t.title,
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
    } catch (err) {
      console.error('Failed to load todos for date', date, err)
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
      } catch (err) {
        console.error('useTasks.toggleTask -> failed to update remote todo', err)
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
        .then(() => {
          console.log('useTasks.deleteTask -> deleted remote todo', nid)
        })
        .catch((err) => {
          console.error('useTasks.deleteTask -> failed to delete remote todo', id, err)
          persist(prev)
        })
    }
  }

  return { tasks, addTask, toggleTask, deleteTask, loadTasksForDate }
}