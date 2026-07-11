import { useState } from 'react'
import type { Task } from '@/types/task'
import type { TaskFormData } from '@/types/task'
import { useTasks } from '@/hooks/useTasks'
import PageContainer from '@/components/layout/PageContainer'
import TasksHeader from '@/components/tasks/TasksHeader'
import TaskTable from '@/components/tasks/TaskTable'
import TaskForm from '@/components/tasks/TaskForm'
import DeleteDialog from '@/components/tasks/DeleteDialog'
import EmptyState from '@/components/tasks/EmptyState'

function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
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

        {tasks.length === 0 ? (
          <EmptyState onCreateTask={handleCreateTask} />
        ) : (
          <TaskTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
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
