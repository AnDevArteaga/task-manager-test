import { createContext } from 'react'
import type { TasksContextType } from '../../interfaces/task.interface'

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export { TasksContext }
