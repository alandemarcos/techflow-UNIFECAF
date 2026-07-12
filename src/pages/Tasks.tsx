import { useState } from 'react'
import type { Task, TaskFormData } from '@/types/task'
import { useTasks } from '@/hooks/useTasks'
import { useTaskList } from '@/hooks/useTaskList'
import PageContainer from '@/components/layout/PageContainer'
import TasksHeader from '@/components/tasks/TasksHeader'
import TaskStats from '@/components/tasks/TaskStats'
import TaskSearchBar from '@/components/tasks/TaskSearchBar'
import TaskFiltersBar from '@/components/tasks/TaskFiltersBar'
import TaskSortControls from '@/components/tasks/TaskSortControls'
import TaskTable from '@/components/tasks/TaskTable'
import TaskForm from '@/components/tasks/TaskForm'
import DeleteDialog from '@/components/tasks/DeleteDialog'
import EmptyState from '@/components/tasks/EmptyState'
import NoResultsState from '@/components/tasks/NoResultsState'
import ViewSwitcher, { type TaskViewMode } from '@/components/kanban/ViewSwitcher'
import KanbanBoard from '@/components/kanban/KanbanBoard'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowUpDown } from 'lucide-react'

function Tasks() {
  const { tasks, addTask, updateTask, updateTaskStatus, deleteTask } = useTasks()
  const taskList = useTaskList(tasks)
  const [view, setView] = useState<TaskViewMode>('list')
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  function handleCreateTask() {
    setSelectedTask(null)
    setFormOpen(true)
  }

  function handleEditTask(task: Task) {
    setSelectedTask(task)
    setFormOpen(true)
  }

  function handleDeleteTask(task: Task) {
    setSelectedTask(task)
    setDeleteOpen(true)
  }

  function handleFormSubmit(data: TaskFormData) {
    if (selectedTask) {
      updateTask(selectedTask.id, data)
      return
    }

    addTask(data)
  }

  function handleConfirmDelete() {
    if (!selectedTask) return

    deleteTask(selectedTask.id)
    setDeleteOpen(false)
    setSelectedTask(null)
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <TasksHeader onCreateTask={handleCreateTask} />

        {tasks.length > 0 && (
          <div className="flex justify-end">
            <ViewSwitcher view={view} onViewChange={setView} />
          </div>
        )}

        {tasks.length === 0 ? (
          <EmptyState onCreateTask={handleCreateTask} />
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in-50 duration-300">
            <TaskStats stats={taskList.stats} />

            <TaskSearchBar
              query={taskList.search.query}
              onQueryChange={taskList.search.setQuery}
              onClear={taskList.search.clearSearch}
            />

            <TaskFiltersBar
              filters={taskList.filters.filters}
              responsibleOptions={taskList.filters.responsibleOptions}
              onStatusChange={(status) =>
                taskList.filters.updateFilter('status', status)
              }
              onPriorityChange={(priority) =>
                taskList.filters.updateFilter('priority', priority)
              }
              onResponsibleChange={(responsible) =>
                taskList.filters.updateFilter('responsible', responsible)
              }
            />

            {view === 'list' && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                    Ordenação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskSortControls
                    sortField={taskList.sort.sort.field}
                    sortDirection={taskList.sort.sort.direction}
                    onSortFieldChange={taskList.sort.updateSortField}
                    onSortDirectionChange={taskList.sort.updateSortDirection}
                  />
                </CardContent>
              </Card>
            )}

            {taskList.hasNoResults ? (
              <NoResultsState onClearFilters={taskList.clearAllFilters} />
            ) : view === 'list' ? (
              <TaskTable
                tasks={taskList.paginatedTasks}
                totalFiltered={taskList.filteredTasks.length}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                pagination={{
                  currentPage: taskList.pagination.currentPage,
                  totalPages: taskList.pagination.totalPages,
                  totalItems: taskList.pagination.totalItems,
                  pageSize: taskList.pagination.pageSize,
                  hasNextPage: taskList.pagination.hasNextPage,
                  hasPreviousPage: taskList.pagination.hasPreviousPage,
                  onPageChange: taskList.pagination.setCurrentPage,
                  onNextPage: taskList.pagination.goToNextPage,
                  onPreviousPage: taskList.pagination.goToPreviousPage,
                }}
              />
            ) : (
              <KanbanBoard
                tasks={taskList.filteredTasks}
                onStatusChange={updateTaskStatus}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        )}

        <TaskForm
          open={formOpen}
          onOpenChange={setFormOpen}
          task={selectedTask}
          onSubmit={handleFormSubmit}
        />

        <DeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          task={selectedTask}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </PageContainer>
  )
}

export default Tasks
