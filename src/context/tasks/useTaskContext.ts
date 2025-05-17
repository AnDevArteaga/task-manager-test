import { useContext } from "react";
import { TasksContext } from "./task-context";

export function useTasksContext() {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasksContext debe usarse dentro de TasksProvider");
    }
    return context;
}
