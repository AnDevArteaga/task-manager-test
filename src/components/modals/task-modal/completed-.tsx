import { CheckCircle, Clock } from "lucide-react";

// Completed status component
interface Props {
    completed: boolean;
    setCompleted: (b: boolean) => void;
}

export default function CompletedStatus({ completed, setCompleted }: Props) {
    return (
        <div className="mb-6 flex items-center">
            <div
                className={`flex items-center gap-2 px-3 text-xs py-1.5 rounded-full transition-all duration-200 cursor-pointer
              ${
                    completed
                        ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-100"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-100"
                }`}
                onClick={() => setCompleted(!completed)}
                data-cy="modal-complete-checkbox"

            >
                {completed
                    ? (
                        <>
                            <CheckCircle size={12} /> <span>Completada</span>
                        </>
                    )
                    : (
                        <>
                            <Clock size={12} /> <span>Pendiente</span>
                        </>
                    )}
                
            </div>
            <span className="text-xs text-gray-700 dark:text-white ml-6">Marcar como completada</span>
        </div>
    );
}
