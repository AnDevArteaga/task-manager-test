import { useTaskModalLogic } from "../../hooks/tasks/useTaskModal";
import { Save, Trash, XCircle } from "lucide-react";
import ConfirmPopover from "../ui/tooltip-confirm";

import Button from "../ui/button";
import CompletedStatus from "../modals/task-modal/completed-";
import Title from "../modals/task-modal/title";
import Priority from "../modals/task-modal/priority";
import DueDate from "../modals/task-modal/date";
import Description from "../modals/task-modal/description";

interface Props {
    taskId: string;
    onClose: () => void;
}

// Task modal component
export default function ModalTarea({ taskId, onClose }: Props) {
    const {
        editingTitle,
        setEditingTitle,
        title,
        setTitle,
        description,
        setDescription,
        editingDescription,
        setEditingDescription,
        textareaDescRef,
        priority,
        setPriority,
        priorityEditing,
        setPriorityEditing,
        dueDate,
        setDueDate,
        completed,
        setCompleted,
        handleSave,
        handleDelete,
        cancelDescriptionEdit,
        getPriorityColor,
        getPriorityBgColor,
        getPriorityIcon,
        setConfirmOpenPopup,
        confirmOpenPopup,
    } = useTaskModalLogic({ taskId, onClose });
    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:bg-gray-900 dark:border-gray-800" data-cy="task-modal">
                {/* Close button */}

                <XCircle
                    size={24}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 p-1 transition-all duration-200 cursor-pointer dark:text-white dark:hover:bg-gray-800"
                />

                {/*State of completeness*/}
                <CompletedStatus
                    completed={completed}
                    setCompleted={setCompleted}
                />

                {/* Title */}
                <Title
                    title={title}
                    setTitle={setTitle}
                    setEditingTitle={setEditingTitle}
                    editingTitle={editingTitle}
                />

                {/* Metadata - Priority and Due date */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    {/* Prioridad */}
                    <Priority
                        priority={priority}
                        setPriority={setPriority}
                        priorityEditing={priorityEditing}
                        setPriorityEditing={setPriorityEditing}
                        getPriorityColor={getPriorityColor}
                        getPriorityBgColor={getPriorityBgColor}
                        getPriorityIcon={getPriorityIcon}
                    />

                    {/* Due date */}
                    <DueDate dueDate={dueDate} setDueDate={setDueDate} />
                </div>

                {/* Description */}
                <Description
                    description={description}
                    setDescription={setDescription}
                    textareaDescRef={textareaDescRef}
                    setEditingDescription={setEditingDescription}
                    editingDescription={editingDescription}
                    cancelDescriptionEdit={cancelDescriptionEdit}
                />
                {/* General buttons */}

                <div className="mt-8 flex justify-between gap-3 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2">
                        <Button
                            icon={Trash}
                            iconSize={16}
                            text="Eliminar"
                            onClick={() => setConfirmOpenPopup(true)}
                            ariaLabel="Cancelar edición"
                            className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                            data-cy="modal-delete-button"
                        />
                        <ConfirmPopover
                            isOpen={confirmOpenPopup}
                            message="¿Eliminar esta tarea?"
                            onConfirm={() => {
                                handleDelete();
                                setConfirmOpenPopup(false);
                            }}
                            onCancel={() => setConfirmOpenPopup(false)}

                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            icon={Save}
                            iconSize={16}
                            text="Guardar cambios"
                            onClick={handleSave}
                            ariaLabel="Guardar cambios"
                            className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                            data-cy="modal-save-button"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
