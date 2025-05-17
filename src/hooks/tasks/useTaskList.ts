import { useState, useEffect } from "react";
import { useTasksContext } from "../../context/tasks/useTaskContext";
import {
    type Estado,
    estadoOptions,
    type FilterType,
    filterTypeOptions,
    type Prioridad,
    prioridadOptions,
} from "../../types/tasks";
import { useTaskNotifications } from "../notis";
import type { Task } from "../../interfaces/task.interface";

//Hook to handle tasks list
export function useTasksListLogic() {
    const { tasks, addTask, projectId } = useTasksContext();
    useTaskNotifications(tasks);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("ninguno");
    const [filterEstado, setFilterEstado] = useState<Estado>("Todos");
    const [filterPrioridad, setFilterPrioridad] = useState<Prioridad>("Todos");

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;
        await addTask({
            project_id: projectId || "",
            title: newTaskTitle.trim(),
            status: "Pendiente",
            priority: "Sin prioridad",
        });
        setNewTaskTitle("");
    };

    // Sort by date first and then put completed at the end
    const sortTasks = (a: Task, b: Task) => {
        //If one is completed and the other is not, the completed one goes to the end
        if (a.status === "Completada" && b.status !== "Completada") return 1;
        if (a.status !== "Completada" && b.status === "Completada") return -1;

        // Both equal in completed, sort by date
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;

        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    };

    // Filter and sort
    const filteredTasks = tasks
        .filter((task) => {
            const estadoOk = filterEstado === "Todos" ||
                task.status === filterEstado;
            const prioridadOk = filterPrioridad === "Todos" ||
                task.priority === filterPrioridad;
            return estadoOk && prioridadOk;
        })
        .sort(sortTasks);

        useEffect(() => {
    // Reset filter when filter type changes
    setFilterEstado("Todos");
    setFilterPrioridad("Todos");
}, [filterType]);

    return {
        newTaskTitle,
        setNewTaskTitle,
        filterType,
        setFilterType,
        filterEstado,
        setFilterEstado,
        filterPrioridad,
        setFilterPrioridad,
        filterTypeOptions,
        estadoOptions,
        prioridadOptions,
        filteredTasks,
        handleAddTask,
    };
}
