import { useRef } from "react";
import type { Project } from "../interfaces/project.interface";
import { TasksProvider } from "../context/tasks/task-provider";
import TasksList from "./task-list";
import ModalTarea from "./modals/task-modal";
import AutoResizeTextArea from "./ui/text-area";
import { Edit, Save, Trash, X } from "lucide-react";
import { useProjectCardLogic } from "../hooks/projects/useProjectCard";
import ConfirmPopover from "./ui/tooltip-confirm";

interface Props {
    project: Project;
    onUpdateProject: (id: string, name: string) => Promise<void>;
    onDeleteProject: (id: string) => Promise<void>;
}

// Project card component for displaying projects

export default function ProjectCard(
    { project, onUpdateProject, onDeleteProject }: Props,
) {
        const ref = useRef(null);

    const {
        modalTaskId,
        setModalTaskId,
        addingTask,
        setAddingTask,
        editing,
        nameInput,
        setNameInput,
        startEdit,
        saveEdit,
        cancelEdit,
        handleDelete,
        handleKeyDown,
        setConfirmOpenPopup,
        confirmOpenPopup,
    } = useProjectCardLogic({
        project,
        onUpdateProject,
        onDeleteProject,
    });
    return (
        <div className="bg-white rounded-lg shadow-md p-5 min-w-[300px] w-full flex flex-wrap h-[fit-content] border border-gray-300 dark:bg-gray-900 dark:border-gray-800" data-cy="project-card">                                             
            <div className="mb-4 w-full">
                {editing
                    ? (
                        <div className="w-full">
                            <div className="flex items-start">
                                <AutoResizeTextArea
                                    value={nameInput}
                                    onChange={(e) =>
                                        setNameInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-grow border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2 text-lg font-medium mr-2 dark:border-gray-700 dark:text-white"
                                    autoFocus
                                    minHeight="4.5rem"
                                    maxHeight="10rem"
                                    submitOnEnter={true}
                                    onSubmit={saveEdit}
                                    data-cy="project-edit-input"
                                />
                                <div className="flex items-start gap-2 flex-shrink-0 mt-2">
                                    <Save
                                        size={20}
                                        onClick={saveEdit}
                                        className="text-green-600 hover:text-green-800 transition-colors cursor-pointer dark:text-white"
                                    />

                                    <X
                                        size={20}
                                        onClick={cancelEdit}
                                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex flex-row items-start justify-between gap-2 w-full">
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors break-words dark:text-white"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") startEdit();
                                    }}
                                    onClick={startEdit}
                                    style={{ wordBreak: "break-word" }}
                                >
                                    {project.name}
                                </h2>
                            </div>

                            <div className="flex flex-row">
                                <Edit
                                    size={18}
                                    onClick={startEdit}
                                    className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0 cursor-pointer dark:text-white"
                                />

                                <Trash
                                    size={18}
                                    onClick={() => setConfirmOpenPopup(true)}
                                    className="text-red-600 hover:text-red-800 transition-colors ml-2 flex-shrink-0 cursor-pointer dark:text-white"
                                    ref={ref}
                                    data-cy="project-delete-button"
                                    
                                />
                                <ConfirmPopover
                                    isOpen={confirmOpenPopup}
                                    message="¿Eliminar este proyecto?"
                                    onConfirm={() => {
                                        handleDelete();
                                        setConfirmOpenPopup(false);
                                    }}
                                    onCancel={() => setConfirmOpenPopup(false)}
                                />
                            </div>
                        </div>
                    )}
            </div>

            <TasksProvider projectId={project.id}>
                <div className="w-full">
                    <div className="flex justify-between items-start">
                        <div className="flex-grow overflow-x-auto">
                            <TasksList
                                onOpenTask={setModalTaskId}
                                addingTask={addingTask}
                                setAddingTask={setAddingTask}
                            />
                        </div>
                    </div>
                </div>

                {modalTaskId && (
                    <ModalTarea
                        taskId={modalTaskId}
                        onClose={() => setModalTaskId(null)}
                    />
                )}
            </TasksProvider>
        </div>
    );
}
