import { createContext } from 'react'
import type { ProjectsContextType } from '../../interfaces/project.interface'

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export { ProjectsContext }
