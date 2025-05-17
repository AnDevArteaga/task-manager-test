import { useContext } from 'react'
import { ProjectsContext } from '../projects/project-context'

export function useProjectsContext() {
  const context = useContext(ProjectsContext)
  if (!context) throw new Error('useProjectsContext debe usarse dentro de ProjectsProvider')
  return context
}
