import { Check, Flag, ChevronDown } from "lucide-react"
import Select from "../../ui/select"
import type { Task } from "../../../interfaces/task.interface"
import type { Dispatch, SetStateAction } from "react"


// Priority component
interface Props {
   priority: "" | "Baja" | "Media" | "Alta" | "Sin prioridad";
  setPriority: Dispatch<SetStateAction<"" | "Baja" | "Media" | "Alta" | "Sin prioridad">>;
  priorityEditing: boolean
  setPriorityEditing: (b: boolean) => void,
  getPriorityColor: (p: string) => string
  getPriorityBgColor: (p: string) => string
  getPriorityIcon: (p: string) => React.ReactNode
}
export default function Priority( { priority, setPriority, priorityEditing, setPriorityEditing, getPriorityColor, getPriorityBgColor, getPriorityIcon }: Props) {
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
                                            { value: "Sin prioridad", label: "Sin prioridad" },
                                            { value: "Alta", label: "Alta" },
                                            { value: "Media", label: "Media" },
                                            { value: "Baja", label: "Baja" },
                                        ]}
                                        autoFocus
                                        className="w-full"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={() =>
                                                setPriorityEditing(false)}
                                            className="text-blue-600 cursor-pointer hover:text-blue-800 flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors duration-200 dark:text-white dark:hover:bg-gray-800"
                                        >
                                            <Check size={16} />
                                        </button>
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
                                        {priority
                                            ? getPriorityIcon(priority)
                                            : (
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
  )
}
