import { Check, X } from "lucide-react";
import TaskItem from "./task-item";
import AutoResizeTextArea from "../ui/text-area";
import FilterSelect from "../ui/select-filter";
import { useTasksListLogic } from "../../hooks/tasks/useTaskList";
import { type Estado, type FilterType, type Prioridad } from "../../types/tasks";
import { Loader2 } from "lucide-react";

interface Props {
    onOpenTask: (id: string) => void;
    addingTask: boolean;
    setAddingTask: (b: boolean) => void;
}

// Task list component
export default function TasksList(
    { onOpenTask, addingTask, setAddingTask }: Props,
) {
    const {
        newTaskTitle,
        setNewTaskTitle,
        filterType,
        setFilterType,
        filterEstado,
        setFilterEstado,
        filterPrioridad,
        setFilterPrioridad,
        filterTypeOptions,
        estadoOptions,
        prioridadOptions,
        filteredTasks,
        handleAddTask,
        loadingState,
    } = useTasksListLogic();

    return (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-auto">
            <div className="flex gap-4 mb-4">
                <FilterSelect
                    value={filterType}
                    onChange={(e) =>
                        setFilterType(e.target.value as FilterType)}
                    options={filterTypeOptions}
                />

                {filterType === "estado" && (
                    <FilterSelect
                        value={filterEstado}
                        onChange={(e) =>
                            setFilterEstado(e.target.value as Estado)}
                        options={estadoOptions}
                    />
                )}

                {filterType === "prioridad" && (
                    <FilterSelect
                        value={filterPrioridad}
                        onChange={(e) =>
                            setFilterPrioridad(e.target.value as Prioridad)}
                        options={prioridadOptions}
                    />
                )}
            </div>

            {loadingState.loadingAllTasks
                ? (
                    <div className="text-center text-gray-500 dark:text-gray-300 py-4">
                        Cargando tareas...
                    </div>
                )
                : (
                    <>
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={() => onOpenTask(task.id)}
                            />
                        ))}

                        {addingTask
                            ? (
                                <div className="flex gap-2">
                                    <AutoResizeTextArea
                                        value={newTaskTitle}
                                        onChange={(e) =>
                                            setNewTaskTitle(e.target.value)}
                                        className="border rounded px-2 py-1 flex-grow dark:border-gray-700 dark:text-white"
                                        placeholder="Nombre de la tarea"
                                        minHeight="3rem"
                                        data-cy="task-input"
                                    />
                                    {loadingState.loadingForAddTask
                                        ? (
                                            <div className="flex items-center justify-center">
                                                <Loader2
                                                    size={16}
                                                    className="animate-spin mr-2 dark:text-white"
                                                />
                                            </div>
                                        )
                                        : (
                                            <>
                                                <button
                                                    onClick={handleAddTask}
                                                    data-cy="save-task-button"
                                                    disabled={loadingState.loadingForAddTask} // deshabilita mientras carga
                                                >
                                                    <Check
                                                        size={20}
                                                        className={`cursor-pointer ${
                                                            loadingState.loadingForAddTask
                                                                ? "text-gray-400"
                                                                : "text-green-600 hover:text-green-800"
                                                        } dark:text-white`}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setAddingTask(
                                                            false,
                                                        )}
                                                    disabled={loadingState.loadingForAddTask}
                                                >
                                                    <X
                                                        size={20}
                                                        className={`cursor-pointer ${
                                                            loadingState.loadingForAddTask
                                                                ? "text-gray-400"
                                                                : "text-gray-400 hover:text-gray-500"
                                                        } dark:text-white`}
                                                    />
                                                </button>
                                            </>
                                        )}
                                </div>
                            )
                            : (
                                <button
                                    onClick={() => setAddingTask(true)}
                                    className="mt-2 text-blue-600 hover:underline self-start cursor-pointer transition-colors duration-200 hover:text-blue-800 text-sm dark:text-white"
                                    data-cy="add-task-button"
                                >
                                    + Añadir tarea
                                </button>
                            )}
                    </>
                )}
        </div>
    );
}
