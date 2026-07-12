import { useCallback, useState } from 'react'
import type { Task, TaskSort, TaskSortField, SortDirection } from '@/types/task'
import { DEFAULT_TASK_SORT } from '@/types/task'
import { sortTasks } from '@/utils/task-list'

export function useTaskSort() {
  const [sort, setSort] = useState<TaskSort>(DEFAULT_TASK_SORT)

  const applySort = useCallback(
    (tasks: Task[]) => sortTasks(tasks, sort),
    [sort],
  )

  const updateSortField = useCallback((field: TaskSortField) => {
    setSort((current) => ({ ...current, field }))
  }, [])

  const updateSortDirection = useCallback((direction: SortDirection) => {
    setSort((current) => ({ ...current, direction }))
  }, [])

  const resetSort = useCallback(() => {
    setSort(DEFAULT_TASK_SORT)
  }, [])

  return {
    sort,
    updateSortField,
    updateSortDirection,
    applySort,
    resetSort,
  }
}
