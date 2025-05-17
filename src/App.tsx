import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import LoaderPage from './components/common/loader-page'

export default function App() {
  const element = useRoutes(routes)
  return (
    <Suspense fallback={<LoaderPage />}>
      {element}
    </Suspense>
  )
}
