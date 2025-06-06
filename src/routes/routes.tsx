import { lazy } from 'react'

// Lazy load
const Managent = lazy(() => import('../pages/managent'))
const Dashboard = lazy(() => import('../pages/dashboard'))
const NotFound = lazy(() => import('../pages/notFound'))

const routes = [

    {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/projects',
    element: <Managent />,
  },
  { path: '*', element: <NotFound /> },

]

export default routes
