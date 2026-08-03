import { useEffect, useState } from 'react'
import { Task } from '../types/task'
import * as storage from '../services/storage'

export function useTasks(initial: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const loaded = storage.loadTasks()
    return loaded.length > 0 ? loaded : initial
  })

  useEffect(() => {
    storage.saveTasks(tasks)
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks((cur) => [...cur, task])
  }

  const editTask = (id: number, patch: Partial<Task>) => {
    setTasks((cur) =>
      cur.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t)),
    )
  }

  const deleteTask = (id: number) => {
    setTasks((cur) => cur.filter((t) => t.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks((cur) =>
      cur.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t)),
    )
  }

  return { tasks, addTask, editTask, deleteTask, toggleTask, setTasks }
}
