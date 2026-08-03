import type { Task } from '../types/task'

const STORAGE_KEY = 'route_tasks'
const STORAGE_VERSION = 1

type StorageSchema = {
  version: number
  tasks: Task[]
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StorageSchema
    if (!parsed || parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.tasks)) {
      return []
    }
    return parsed.tasks
  } catch (e) {
    console.warn('loadTasks: failed to parse storage, resetting to empty', e)
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    const payload: StorageSchema = { version: STORAGE_VERSION, tasks }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (e) {
    console.warn('saveTasks: failed to save', e)
  }
}
