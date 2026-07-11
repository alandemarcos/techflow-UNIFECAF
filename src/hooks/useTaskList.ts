import { useEffect, useMemo } from 'react'
import type { Task } from '@/types/task'
import { computeTaskListStats } from '@/utils/task-list'
import { usePagination } from '@/hooks/usePagination'
import { useTaskFilters } from '@/hooks/useTaskFilters'
import { useTaskSearch } from '@/hooks/useTaskSearch'
import { useTaskSort } from '@/hooks/useTaskSort'

export function useTaskList(tasks: Task[]) {
  const search = useTaskSearch()
  const filters = useTaskFilters(tasks)
  const sort = useTaskSort()

  const filteredTasks = useMemo(() => {
    let result = tasks
    result = search.applySearch(result)
    result = filters.applyFilters(result)
    result = sort.applySort(result)
    return result
  }, [tasks, search, filters, sort])

  const pagination = usePagination(filteredTasks)
  const { resetPage } = pagination

  const stats = useMemo(() => computeTaskListStats(tasks), [tasks])

  useEffect(() => {
    resetPage()
  }, [search.query, filters.filters, sort.sort, resetPage])

  const hasNoResults =
    tasks.length > 0 && filteredTasks.length === 0

  function clearAllFilters() {
    search.clearSearch()
    filters.resetFilters()
    sort.resetSort()
    pagination.resetPage()
  }

  return {
    filteredTasks,
    paginatedTasks: pagination.paginatedItems,
    stats,
    hasNoResults,
    clearAllFilters,
    search,
    filters,
    sort,
    pagination,
  }
}
