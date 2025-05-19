//Hook tsx to get task styles, need import icons from lucide-react
import { type ReactNode, useMemo } from "react";
import { AlertCircle, CheckCircle, Clock, Flag } from "lucide-react";

interface Task {
    status: string;
    priority: string;
    due_date?: string;
}

//Hook to get task styles
export const useTaskStylesItem = (task: Task ) => {
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


export const useTaskStylesModal = () => {
        const getPriorityColor = (prio: string): string => {
        const map: Record<string, string> = {
            Alta: "text-red-600 dark:text-red-200",
            Media: "text-yellow-600 dark:text-yellow-200",
            Baja: "text-green-600 dark:text-green-200",
        };
        return map[prio] || "text-gray-600 dark:text-gray-200";
    };

    const getPriorityBgColor = (prio: string): string => {
        const map: Record<string, string> = {
            Alta:
                "bg-red-100 border-red-200 dark:bg-red-500/20 dark:border-red-400",
            Media:
                "bg-yellow-100 border-yellow-200 dark:bg-yellow-500/20 dark:border-yellow-400",
            Baja:
                "bg-green-100 border-green-200 dark:bg-green-500/20 dark:border-green-400",
        };
        return map[prio] ||
            "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700";
    };

    const getPriorityIcon = (prio: string): ReactNode => {
        const map: Record<string, ReactNode> = {
            Alta: (
                <AlertCircle
                    size={16}
                    className="text-red-600 dark:text-red-400"
                />
            ),
            Media: (
                <Clock
                    size={16}
                    className="text-yellow-600 dark:text-yellow-400"
                />
            ),
            Baja: (
                <Flag
                    size={16}
                    className="text-green-600 dark:text-green-400"
                />
            ),
        };
        return map[prio] || (
            <Flag size={16} className="text-gray-400 dark:text-gray-300" />
        );
    };

    return {
        getPriorityColor,
        getPriorityBgColor,
        getPriorityIcon,
    };
};