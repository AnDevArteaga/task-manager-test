import type { Task } from "../../interfaces/task.interface";
import { AlertCircle } from "lucide-react";
import { useTaskStylesItem } from "../../hooks/tasks/useTaskStyles";

interface Props {
    task: Task;
    onClick: () => void;
}

// Task item component for displaying tasks

export default function TaskItem({ task, onClick }: Props) {
    const { StatusIcon, priorityLevel, dueDateStyles } = useTaskStylesItem(task);

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer px-2 py-1 border-l-4 
        shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1
        ${dueDateStyles.borderColor} ${dueDateStyles.bgColor}
        ${task.status === "Completada" ? "opacity-80" : "opacity-100"}
      `}
            title={`${task.title} - ${task.status}`}
            data-cy="task-item"
            role="region"
            aria-label={`Tarea ${task.title}`}
            tabIndex={0}
        >
            <div className="flex flex-col">
                <div className="flex items-start justify-between">
                    <span
                        className={`font-medium break-words text-xs whitespace-pre-wrap transition-all duration-200 
              ${
                            task.status === "Completada"
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : dueDateStyles.textColor
                        }`}
                    >
                        {task.title}
                    </span>
                    <StatusIcon
                        size={16}
                        className={`ml-2 flex-shrink-0 ${
                            task.status === "Completada"
                                ? "text-green-500"
                                : dueDateStyles.iconColor
                        }`}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span
                        className={`text-xs ${dueDateStyles.textColor} flex items-center gap-2`}
                        data-cy="task-status"
                    >
                        {task.status}
                        {dueDateStyles.isOverdue && (
                            <span className="text-red-600 dark:text-red-400 font-semibold">
                                (Vencida)
                            </span>
                        )}
                    </span>

                    <div className="flex items-center">
                        {task.priority === "Alta" && (
                            <AlertCircle
                                size={14}
                                className="mr-1 text-red-500 dark:text-red-400"
                            />
                        )}
                        <span
                            className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-200
                ${
                                priorityLevel === "alta"
                                    ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                                    : priorityLevel === "media"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                                    : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                            }
              `}
                        >
                            {task.priority}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
