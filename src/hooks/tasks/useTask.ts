import { useEffect, useState } from "react";
import type { Task } from "../../interfaces/task.interface";
import * as taskService from "../../services/task-service";
import { toast } from "react-toastify";
import { useLoadingTask } from "./useLoadingTask";

// Custom hook to handle task operations within a project
export function useTasks(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { withLoading, loadingState } = useLoadingTask();

    // Fetch tasks associated with the project
    const fetchTasks = async () => {
        await withLoading(async () => {
            const data = await taskService.getTasks(projectId);
            setTasks(data);
        }, "Error cargando tareas", "loadingAllTasks");
    };

    // Create a new task
    const addTask = async (task: Omit<Task, "id" | "created_at">) => {
        await withLoading(async () => {
            const newTask = await taskService.createTask(task);
            setTasks((prev) => [newTask, ...prev]);
            toast.success("Tarea creada correctamente");
        }, "Error creando tarea", "loadingForAddTask");
    };

    // Update a task by ID
    const updateTask = async (
        id: string,
        updates: Partial<Omit<Task, "id" | "project_id" | "created_at">>
    ) => {
        await withLoading(async () => {
            const updated = await taskService.updateTask(id, updates);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
            toast.success("Tarea actualizada correctamente");
        }, "Error actualizando tarea", "loadingForUpdateTask");
    };

    // Delete a task by ID
    const deleteTask = async (id: string) => {
        await withLoading(async () => {
            await taskService.deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            toast.success("Tarea eliminada correctamente");
        }, "Error eliminando tarea", "loadingForDeleteTask");
    };

    // Fetch tasks when project ID changes
    useEffect(() => {
        if (projectId) fetchTasks();
    }, [projectId]);

    return {
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        loadingState,
    };
}
