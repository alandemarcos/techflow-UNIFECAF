import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Task, TaskFormData, TaskListStats, TaskStatus } from '@/types/task'
import { INITIAL_TASKS } from '@/data/initial-tasks'
import {
  createTaskFromForm,
  updateTaskFromForm,
  updateTaskStatus as applyTaskStatus,
} from '@/utils/task'
import { computeTaskListStats } from '@/utils/task-list'

/** Estado global de tarefas — fonte única de verdade para CRUD e estatísticas. */

interface TasksContextValue {
  tasks: Task[]
  stats: TaskListStats
  addTask: (data: TaskFormData) => void
  updateTask: (id: string, data: TaskFormData) => void
  updateTaskStatus: (id: string, status: TaskStatus) => void
  deleteTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

const TasksContext = createContext<TasksContextValue | null>(null)

interface TasksProviderProps {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const stats = useMemo(() => computeTaskListStats(tasks), [tasks])

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

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? applyTaskStatus(task, status) : task,
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
      updateTaskStatus,
      deleteTask,
      getTaskById,
    }),
    [tasks, stats, addTask, updateTask, updateTaskStatus, deleteTask, getTaskById],
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
