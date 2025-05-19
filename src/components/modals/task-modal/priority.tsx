import { Check, ChevronDown, Flag } from "lucide-react";
import Select from "../../ui/select";
import type { Task } from "../../../interfaces/task.interface";
import Button from "../../ui/button";

// Priority component
interface Props {
    priority: "" | "Baja" | "Media" | "Alta" | "Sin prioridad";
    setPriority: (
        value: "" | "Baja" | "Media" | "Alta" | "Sin prioridad",
    ) => void;
    priorityEditing: boolean;
    setPriorityEditing: (b: boolean) => void;
    getPriorityColor: (p: string) => string;
    getPriorityBgColor: (p: string) => string;
    getPriorityIcon: (p: string) => React.ReactNode;
}
export default function Priority(
    {
        priority,
        setPriority,
        priorityEditing,
        setPriorityEditing,
        getPriorityColor,
        getPriorityBgColor,
        getPriorityIcon,
    }: Props,
) {
    return (
        <div className="flex-1">
            <label className="block mb-2 font-medium text-xs text-gray-700 flex items-center gap-1 dark:text-white">
                <Flag size={12} /> Prioridad
            </label>
            {priorityEditing
                ? (
                    <div>
                        <Select
                            value={priority || ""}
                            onChange={(value) =>
                                setPriority(
                                    value as Task["priority"],
                                )}
                            options={[
                                {
                                    value: "Sin prioridad",
                                    label: "Sin prioridad",
                                },
                                { value: "Alta", label: "Alta" },
                                { value: "Media", label: "Media" },
                                { value: "Baja", label: "Baja" },
                            ]}
                            autoFocus
                            className="w-full"
                        />
                        <div className="flex justify-end mt-2 gap-2 items-center">
                            <span className="text-gray-700 dark:text-white text-xs">
                                Recuerde guardar la prioridad
                            </span>
                            <Button
                                icon={Check}
                                iconSize={16}
                                text="Guardar"
                                onClick={() => setPriorityEditing(false)}
                                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                                aria-label="Guardar descripción"
                            />
                        </div>
                    </div>
                )
                : (
                    <div
                        className={`flex items-center justify-between border ${
                            priority
                                ? getPriorityBgColor(priority)
                                : "bg-gray-50"
                        } rounded-lg px-2 py-2 cursor-pointer hover:shadow-md transition-all duration-200`}
                        onClick={() => setPriorityEditing(true)}
                        title="Cambiar prioridad"
                    >
                        <div className="flex items-center gap-2 text-xs">
                            {priority ? getPriorityIcon(priority) : (
                                <Flag
                                    size={16}
                                    className="text-gray-800"
                                />
                            )}
                            <span
                                className={priority
                                    ? getPriorityColor(priority)
                                    : "text-gray-500"}
                            >
                                {priority || "No hay prioridad"}
                            </span>
                        </div>
                        <ChevronDown
                            size={16}
                            className="text-gray-400"
                        />
                    </div>
                )}
        </div>
    );
}
