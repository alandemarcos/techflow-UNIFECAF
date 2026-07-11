import { useCallback, useState } from 'react'
import type { Task } from '@/types/task'
import { filterTasksBySearch } from '@/utils/task-list'

export function useTaskSearch() {
  const [query, setQuery] = useState('')

  const applySearch = useCallback(
    (tasks: Task[]) => filterTasksBySearch(tasks, query),
    [query],
  )

  const clearSearch = useCallback(() => {
    setQuery('')
  }, [])

  return {
    query,
    setQuery,
    applySearch,
    clearSearch,
  }
}
