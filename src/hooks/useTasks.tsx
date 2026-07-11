import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Task, TaskFormData } from '@/types/task'
import { INITIAL_TASKS } from '@/data/initial-tasks'
import { createTaskFromForm, updateTaskFromForm } from '@/utils/task'

interface TaskStats {
  total: number
  inProgress: number
  completed: number
  pending: number
  highPriority: number
}

interface TasksContextValue {
  tasks: Task[]
  stats: TaskStats
  addTask: (data: TaskFormData) => void
  updateTask: (id: string, data: TaskFormData) => void
  deleteTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

const TasksContext = createContext<TasksContextValue | null>(null)

function computeStats(tasks: Task[]): TaskStats {
  return {
    total: tasks.length,
    inProgress: tasks.filter((task) => task.status === 'In Progress').length,
    completed: tasks.filter((task) => task.status === 'Done').length,
    pending: tasks.filter((task) => task.status === 'To Do').length,
    highPriority: tasks.filter((task) => task.priority === 'High').length,
  }
}

interface TasksProviderProps {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const stats = useMemo(() => computeStats(tasks), [tasks])

  const addTask = useCallback((data: TaskFormData) => {
    setTasks((current) => [...current, createTaskFromForm(data)])
  }, [])

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? updateTaskFromForm(task, data) : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const getTaskById = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks],
  )

  const value = useMemo(
    () => ({
      tasks,
      stats,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [tasks, stats, addTask, updateTask, deleteTask, getTaskById],
  )

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks deve ser usado dentro de TasksProvider')
  }

  return context
}
