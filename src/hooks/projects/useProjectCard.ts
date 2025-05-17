import { useEffect, useRef, useState } from "react";
import type { Project } from "../../interfaces/project.interface";


//Hook to handler project card
interface UseProjectCardLogicProps {
    project: Project;
    onUpdateProject: (id: string, name: string) => Promise<void>;
    onDeleteProject: (id: string) => Promise<void>;
}

export function useProjectCardLogic({
    project,
    onUpdateProject,
    onDeleteProject,
}: UseProjectCardLogicProps) {
    const [modalTaskId, setModalTaskId] = useState<string | null>(null);
    const [addingTask, setAddingTask] = useState(false);
    const [editing, setEditing] = useState(false);
    const [nameInput, setNameInput] = useState(project.name);
    const [confirmOpenPopup, setConfirmOpenPopup] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea based on content
    useEffect(() => {
        if (textareaRef.current && editing) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                `${textareaRef.current.scrollHeight}px`;
        }
    }, [nameInput, editing]);

    // Start editing when clicking on the name card
    const startEdit = () => {
        setEditing(true);
        setNameInput(project.name);
        // Esperar a que el textarea esté renderizado para hacer focus
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        }, 0);
    };

    // Save changes
    const saveEdit = async () => {
        if (nameInput.trim() && nameInput.trim() !== project.name) {
            await onUpdateProject(project.id, nameInput.trim());
        }
        setEditing(false);
    };

    // Cancel changes
    const cancelEdit = () => {
        setEditing(false);
        setNameInput(project.name);
    };

    // Handle delete project
    const handleDelete = async () => {
        await onDeleteProject(project.id);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveEdit();
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    };

    return {
        modalTaskId,
        setModalTaskId,
        addingTask,
        setAddingTask,
        editing,
        nameInput,
        setNameInput,
        textareaRef,
        startEdit,
        saveEdit,
        cancelEdit,
        handleDelete,
        handleKeyDown,
        setConfirmOpenPopup,
        confirmOpenPopup,
    };
}
