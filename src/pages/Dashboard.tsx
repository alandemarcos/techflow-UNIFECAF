import PageContainer from '@/components/layout/PageContainer'
import StatsGrid from '@/components/dashboard/StatsGrid'
import WelcomePanel from '@/components/dashboard/WelcomePanel'

function Dashboard() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <WelcomePanel />
        <StatsGrid />
      </div>
    </PageContainer>
  )
}

export default Dashboard
