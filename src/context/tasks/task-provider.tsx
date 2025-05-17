import type { ReactNode } from "react";
import { TasksContext } from "./task-context";
import { useTasksLogic } from "../../hooks/tasks/useTask";

interface TasksProviderProps {
    projectId: string;
    children: ReactNode;
}

export const TasksProvider = ({ projectId, children }: TasksProviderProps) => {
    const tasksState = useTasksLogic(projectId);

    return (
        <TasksContext.Provider value={{...tasksState, projectId}}>
            {children}
        </TasksContext.Provider>
    );
};
