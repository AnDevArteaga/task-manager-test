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

// Hook to handle task list UI logic and filters
export function useTasksListLogic() {
    const { tasks, addTask, projectId, loadingState } = useTasksContext();
    useTaskNotifications(tasks);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("ninguno");
    const [filterEstado, setFilterEstado] = useState<Estado>("Todos");
    const [filterPrioridad, setFilterPrioridad] = useState<Prioridad>("Todos");



// Add a new task
const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return; // Prevent adding task if title is empty

    try {
        // Call addTask with the necessary task data
        await addTask({
            project_id: projectId || "",
            title: newTaskTitle.trim(),
            status: "Pendiente",
            priority: "Sin prioridad",
        });
        setNewTaskTitle(""); // Clear input field after task is added
    } catch (error) {
        // Error handling already done in addTask, this block can be omitted
        console.error("Error adding task:", error);
    }
};

    // Sort tasks: incomplete first, then by due date
    const sortTasks = (a: Task, b: Task) => {
        if (a.status === "Completada" && b.status !== "Completada") return 1;
        if (a.status !== "Completada" && b.status === "Completada") return -1;

        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;

        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    };

    // Apply filters and sorting
    const filteredTasks = tasks
        .filter((task) => {
            const estadoMatch = filterEstado === "Todos" || task.status === filterEstado;
            const prioridadMatch = filterPrioridad === "Todos" || task.priority === filterPrioridad;
            return estadoMatch && prioridadMatch;
        })
        .sort(sortTasks);

    // Reset filters when filter type changes
    useEffect(() => {
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
        loadingState,     
    };
}
