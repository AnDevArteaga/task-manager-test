import type { ReactNode } from "react";
import { TasksContext } from "./task-context";
import { useTasks } from "../../hooks/tasks/useTask";

interface TasksProviderProps {
    projectId: string;
    children: ReactNode;
}

export const TasksProvider = ({ projectId, children }: TasksProviderProps) => {
    const tasksState = useTasks(projectId);

    return (
        <TasksContext.Provider value={{...tasksState, projectId}}>
            {children}
        </TasksContext.Provider>
    );
};
