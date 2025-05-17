// Hook to fetch all tasks to display metrics on the dashboard
import { useEffect, useState } from "react";
import { getAllTasks } from "../../services/task-service";
import type { Task } from "../../interfaces/task.interface";

export function useTaskStats() {
    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            const tasks: Task[] = await getAllTasks();

            const completedTasks = tasks.filter((t) =>
                t.status === "Completada"
            ).length;
            const pendingTasks =
                tasks.filter((t) => t.status !== "Completada").length;

            setCompleted(completedTasks);
            setPending(pendingTasks);
            setLoading(false);
        };

        loadStats();
    }, []);

    return { completed, pending, loading };
}
