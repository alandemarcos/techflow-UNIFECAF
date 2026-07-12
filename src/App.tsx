import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import NotFound from '@/pages/NotFound'
import Tasks from '@/pages/Tasks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
