import { useTaskModalLogic } from "../../../hooks/tasks/useTaskModal";
import { useTaskStylesModal } from "../../../hooks/tasks/useTaskStyles";
import { Save, Trash, XCircle } from "lucide-react";
import ConfirmPopover from "../../ui/tooltip-confirm";

import Button from "../../ui/button";
import CompletedStatus from "./completed-";
import Title from "./title";
import Priority from "./priority";
import DueDate from "./date";
import Description from "./description";

interface Props {
    taskId: string;
    onClose: () => void;
}

export default function ModalTarea({ taskId, onClose }: Props) {
    const {
        state,
        updateState,
        formValues,
        updateFormValue,
        textareaDescRef,
        handleSave,
        handleDelete,
        loadingState,
    } = useTaskModalLogic({ taskId, onClose });
    const { getPriorityColor, getPriorityBgColor, getPriorityIcon } = useTaskStylesModal();

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50 backdrop-blur-sm"   role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <XCircle
                    size={24}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 p-1 transition-all duration-200 cursor-pointer dark:text-white dark:hover:bg-gray-800"
                     role="button"
  aria-label="Cerrar modal"
  tabIndex={0}
                />

                <CompletedStatus
                    completed={formValues.completed}
                    setCompleted={(val) => updateFormValue("completed", val)}
                />

                <Title
                    title={formValues.title}
                    setTitle={(val) => updateFormValue("title", val)}
                    editingTitle={state.editingTitle}
                    setEditingTitle={(val) => updateState("editingTitle", val)}
                />

                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <Priority
                        priority={formValues.priority}
                        setPriority={(val) => updateFormValue("priority", val)}
                        priorityEditing={state.priorityEditing}
                        setPriorityEditing={(val) =>
                            updateState("priorityEditing", val)}
                        getPriorityColor={getPriorityColor}
                        getPriorityBgColor={getPriorityBgColor}
                        getPriorityIcon={getPriorityIcon}
                    />

                    <DueDate
                        dueDate={formValues.dueDate}
                        setDueDate={(val) => updateFormValue("dueDate", val)}
                    />
                </div>

                <Description
                    description={formValues.description}
                    setDescription={(val) =>
                        updateFormValue("description", val)}
                    editingDescription={state.editingDescription}
                    setEditingDescription={(val) =>
                        updateState("editingDescription", val)}
                    textareaDescRef={textareaDescRef}
                />

                <div className="mt-8 flex justify-between gap-3 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2">
                        <Button
                            icon={Trash}
                            iconSize={16}
                            text="Eliminar"
                            onClick={() =>
                                updateState(
                                    "confirmOpenPopup",
                                    true,
                                )}
                            ariaLabel="Eliminar tarea"
                            className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                            data-cy="modal-delete-button"
                        />
                        <ConfirmPopover
                            isOpen={state.confirmOpenPopup}
                            message="¿Eliminar esta tarea?"
                            onConfirm={() => {
                                handleDelete();
                            }}
                            onCancel={() =>
                                updateState(
                                    "confirmOpenPopup",
                                    false,
                                )}
                            loading={loadingState
                                .loadingForDeleteTask}
                                
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
                            disabled={loadingState
                                .loadingForUpdateTask}
                            loader={loadingState
                                .loadingForUpdateTask}
                            data-cy="modal-save-button"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
