import { useMemo } from "react";
import { CheckCircle, Clock } from "lucide-react";

interface Task {
    status: string;
    priority: string;
    due_date?: string;
}

//Hook to get task styles
export const useTaskStyles = (task: Task) => {
    const StatusIcon = useMemo(() => {
        return task.status === "Completada" ? CheckCircle : Clock;
    }, [task.status]);

    const priorityLevel = useMemo(() => {
        switch (task.priority) {
            case "Alta":
                return "alta";
            case "Media":
                return "media";
            default:
                return "baja";
        }
    }, [task.priority]);

    // Get due date styles
    const dueDateStyles = useMemo(() => {
        if (task.status === "Completada") {
            return {
                borderColor: "border-green-500",
                bgColor: "bg-green-50 dark:bg-green-900/30",
                textColor: "text-green-700 dark:text-green-300",
                iconColor: "text-green-500 dark:text-green-400",
                isOverdue: false,
            };
        }

        if (!task.due_date) {
            return {
                borderColor: "border-gray-700 dark:border-gray-600",
                bgColor: "bg-white dark:bg-gray-800",
                textColor: "text-gray-700 dark:text-gray-400",
                iconColor: "text-gray-700 dark:text-gray-300",
                isOverdue: false,
            };
        }

        const now = new Date();
        const due = new Date(task.due_date);
        const diffMs = due.getTime() - now.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays <= 0) {
            return {
                borderColor: "border-red-500",
                bgColor: "bg-red-50 dark:bg-red-900/30",
                textColor: "text-red-700 dark:text-red-300",
                iconColor: "text-red-600 dark:text-red-400",
                isOverdue: true,
            };
        } else if (diffDays > 0 && diffDays < 1.5) {
            return {
                borderColor: "border-orange-500",
                bgColor: "bg-orange-50 dark:bg-orange-900/30",
                textColor: "text-orange-600 dark:text-orange-400",
                iconColor: "text-orange-500 dark:text-orange-400",
                isOverdue: false,
            };
        } else if (diffDays >= 1.5 && diffDays <= 5) {
            return {
                borderColor: "border-yellow-400",
                bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
                textColor: "text-yellow-700 dark:text-yellow-300",
                iconColor: "text-yellow-500 dark:text-yellow-400",
                isOverdue: false,
            };
        } else {
            return {
                borderColor: "border-gray-700 dark:border-gray-600",
                bgColor: "bg-white dark:bg-gray-800",
                textColor: "text-gray-800 dark:text-gray-100",
                iconColor: "text-gray-700 dark:text-gray-300",
                isOverdue: false,
            };
        }
    }, [task.status, task.due_date]);

    return {
        StatusIcon,
        priorityLevel,
        dueDateStyles,
    };
};
