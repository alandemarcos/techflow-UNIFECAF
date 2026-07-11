import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Fragment } from 'react'

interface TaskPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  onNextPage: () => void
  onPreviousPage: () => void
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, totalPages, currentPage])

  if (currentPage > 1) pages.add(currentPage - 1)
  if (currentPage < totalPages) pages.add(currentPage + 1)

  return [...pages].sort((a, b) => a - b)
}

function TaskPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}: TaskPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)
  const visiblePages = getVisiblePages(currentPage, totalPages)

  if (totalItems === 0) return null

  return (
    <div className="flex flex-col gap-4 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalItems}</span>{' '}
        {totalItems === 1 ? 'tarefa' : 'tarefas'} no total
        {totalPages > 1 && (
          <>
            {' '}
            · Exibindo {startItem}–{endItem} · Página{' '}
            <span className="font-medium text-foreground">{currentPage}</span>{' '}
            de{' '}
            <span className="font-medium text-foreground">{totalPages}</span>
          </>
        )}
      </p>

      {totalPages > 1 && (
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={onPreviousPage}
                disabled={!hasPreviousPage}
              />
            </PaginationItem>

            {visiblePages.map((page, index) => {
              const previousPage = visiblePages[index - 1]
              const showEllipsis = previousPage !== undefined && page - previousPage > 1

              return (
                <Fragment key={page}>
                  {showEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </Fragment>
              )
            })}

            <PaginationItem>
              <PaginationNext onClick={onNextPage} disabled={!hasNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default TaskPagination
