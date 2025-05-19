// Hook to fetch all tasks to display metrics on the dashboard
import { useEffect, useState } from "react";
import { getAllTasks } from "../../services/task-service";
import type { Task } from "../../interfaces/task.interface";

export function useTaskStats() {
    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);
    const [loading, setLoading] = useState(true);

    const countCompletedTasks = (tasks: Task[]) =>
        tasks.filter((t) => t.status === "Completada").length;

    const countPendingTasks = (tasks: Task[]) =>
        tasks.filter((t) => t.status !== "Completada").length;

    const loadStats = async () => {
        setLoading(true);
        try {
            const tasks = await getAllTasks();
            setCompleted(countCompletedTasks(tasks));
            setPending(countPendingTasks(tasks));
        } catch (error) {
            console.error("Error al cargar las tareas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return { completed, pending, loading };
}
