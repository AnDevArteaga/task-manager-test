import { useEffect, useRef, useState } from "react";
import type { Project } from "../../interfaces/project.interface";

// Props for handling actions on the project card
interface UseProjectCardLogicProps {
    project: Project;
    onUpdateProject: (id: string, name: string) => Promise<void>;
    onDeleteProject: (id: string) => Promise<void>;
}

// Hook to encapsulate logic for a single project card
export function useProjectCardLogic({
    project,
    onUpdateProject,
    onDeleteProject,
}: UseProjectCardLogicProps) {
    const [modalTaskId, setModalTaskId] = useState<string | null>(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [projectName, setProjectName] = useState(project.name);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Resize textarea dynamically while editing
    useEffect(() => {
        if (textareaRef.current && isEditing) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                `${textareaRef.current.scrollHeight}px`;
        }
    }, [projectName, isEditing]);

    // Enter edit mode and focus textarea
    const startEditing = () => {
        setIsEditing(true);
        setProjectName(project.name);
        setTimeout(() => textareaRef.current?.focus(), 0); // Ensure textarea is rendered
    };

    // Save edited project name if valid and changed
    const saveEdit = async () => {
        const trimmed = projectName.trim();
        if (trimmed && trimmed !== project.name) {
            await onUpdateProject(project.id, trimmed);
        }
        setIsEditing(false);
    };

    // Cancel editing and revert name
    const cancelEdit = () => {
        setIsEditing(false);
        setProjectName(project.name);
    };

    // Delete project
    const handleDelete = async () => {
        await onDeleteProject(project.id);
    };

    // Handle Enter (submit) and Escape (cancel) key actions
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
        isAddingTask,
        setIsAddingTask,
        isEditing,
        startEditing,
        saveEdit,
        cancelEdit,
        projectName,
        setProjectName,
        textareaRef,
        handleKeyDown,
        handleDelete,
        isConfirmPopupOpen,
        setIsConfirmPopupOpen,
    };
}
