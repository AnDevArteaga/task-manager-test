import { useEffect, useRef } from "react";
import type { Task } from "../interfaces/task.interface";

const THRESHOLD_HOURS = 24; // 1 day

// Hook to handle task notifications
export function useTaskNotifications(tasks: Task[]) {
    const notifiedTasks = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!("Notification" in window)) return;

        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        if (Notification.permission !== "granted") return;

        const intervalId = setInterval(() => {
            const now = new Date();

            tasks.forEach((task) => {
                if (!task.due_date || notifiedTasks.current.has(task.id)) {
                    return;
                }

                const dueDate = new Date(task.due_date);
                const diffHours = (dueDate.getTime() - now.getTime()) /
                    (1000 * 60 * 60);

                if (diffHours > 0 && diffHours <= THRESHOLD_HOURS) {
                    new Notification("Tarea próxima a vencer", {
                        body: `${task.title} vence en menos de ${
                            Math.ceil(diffHours)
                        } horas`,
                    });
                    notifiedTasks.current.add(task.id);
                }
            });
        }, 1000); // Every 1 second for quick test for now, next review per day

        return () => clearInterval(intervalId);
    }, [tasks]);
}
