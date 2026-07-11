import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePagination } from '@/hooks/usePagination'

describe('usePagination', () => {
  const items = Array.from({ length: 25 }, (_, index) => `item-${index + 1}`)

  it('inicializa na primeira página', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(3)
    expect(result.current.totalItems).toBe(25)
    expect(result.current.paginatedItems).toHaveLength(10)
  })

  it('goToNextPage avança para próxima página', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    act(() => {
      result.current.goToNextPage()
    })

    expect(result.current.currentPage).toBe(2)
    expect(result.current.hasPreviousPage).toBe(true)
  })

  it('goToPreviousPage volta para página anterior', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    act(() => {
      result.current.setCurrentPage(2)
      result.current.goToPreviousPage()
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('setCurrentPage respeita limites', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    act(() => {
      result.current.setCurrentPage(99)
    })

    expect(result.current.currentPage).toBe(3)

    act(() => {
      result.current.setCurrentPage(0)
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('hasNextPage indica se há próxima página', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    expect(result.current.hasNextPage).toBe(true)

    act(() => {
      result.current.setCurrentPage(3)
    })

    expect(result.current.hasNextPage).toBe(false)
  })

  it('resetPage volta para primeira página', () => {
    const { result } = renderHook(() => usePagination(items, 10))

    act(() => {
      result.current.setCurrentPage(3)
      result.current.resetPage()
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('ajusta página quando itens diminuem', () => {
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data, 10),
      { initialProps: { data: items } },
    )

    act(() => {
      result.current.setCurrentPage(3)
    })

    rerender({ data: items.slice(0, 5) })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(1)
  })
})
