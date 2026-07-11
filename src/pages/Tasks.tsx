import PageContainer from '@/components/layout/PageContainer'
import TasksHeader from '@/components/tasks/TasksHeader'
import TasksTable from '@/components/tasks/TasksTable'
import { MOCK_TASKS } from '@/data/mock-tasks'

function Tasks() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <TasksHeader />
        <TasksTable tasks={MOCK_TASKS} />
      </div>
    </PageContainer>
  )
}

export default Tasks
