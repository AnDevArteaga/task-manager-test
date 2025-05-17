import { useEffect, useState } from "react";
import type { Task } from "../../interfaces/task.interface";
import * as taskService from "../../services/task-service";
import { toast } from "react-toastify";

//Hook to fetch tasks
export function useTasksLogic(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskService.getTasks(projectId);
            setTasks(data);
        } catch {
            setError("Error cargando tareas");
        } finally {
            setLoading(false);
        }
    };

    // Add a new task
    const addTask = async (task: Omit<Task, "id" | "created_at">) => {
        setLoading(true);
        setError(null);
        try {
            const newTask = await taskService.createTask(task);
            setTasks((prev) => [newTask, ...prev]);
            toast.success("Tarea creada correctamente");
        } catch {
            setError("Error creando tarea");
            toast.error("Error creando tarea");
        } finally {
            setLoading(false);
        }
    };

    // Update a task
    const updateTask = async (
        id: string,
        updates: Partial<Omit<Task, "id" | "project_id" | "created_at">>,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await taskService.updateTask(id, updates);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
            toast.success("Tarea actualizada correctamente");
        } catch {
            setError("Error actualizando tarea");
            toast.error("Error actualizando tarea");
        } finally {
            setLoading(false);
        }
    };

    // Delete a task
    const deleteTask = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await taskService.deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            toast.success("Tarea eliminada correctamente");
        } catch {
            setError("Error eliminando tarea");
            toast.error("Error eliminando tarea");
        } finally {
            setLoading(false);
        }
    };

    // Fetch tasks on mount
    useEffect(() => {
        if (projectId) fetchTasks();
    }, [projectId]);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
    };
}
