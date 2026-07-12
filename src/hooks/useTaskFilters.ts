import { useCallback, useMemo, useState } from 'react'
import type { Task, TaskFilters } from '@/types/task'
import { DEFAULT_TASK_FILTERS } from '@/types/task'
import {
  filterTasksByFilters,
  getUniqueResponsibles,
} from '@/utils/task-list'

export function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_TASK_FILTERS)

  const responsibleOptions = useMemo(
    () => getUniqueResponsibles(tasks),
    [tasks],
  )

  const applyFilters = useCallback(
    (items: Task[]) => filterTasksByFilters(items, filters),
    [filters],
  )

  const updateFilter = useCallback(
    <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }))
    },
    [],
  )

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_TASK_FILTERS)
  }, [])

  return {
    filters,
    updateFilter,
    applyFilters,
    resetFilters,
    responsibleOptions,
  }
}
