import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectsContext } from "../../context/projects/useProjectContext";
import { toast } from "react-toastify";

// Custom hook to manage project operations and UI state
export function useProjectsManager() {
    const {
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
    } = useProjectsContext();

    const [newProjectName, setNewProjectName] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Handle the creation of a new project
    const handleAddProject = async () => {
        const trimmedName = newProjectName.trim();
        if (!trimmedName) return;

        setIsSubmitting(true);
        try {
            await addProject(trimmedName);
            setNewProjectName("");
            setIsFormVisible(false);
        } catch (err) {
            console.error("Failed to add project:", err);
            toast.error("Error al crear el proyecto");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle project name update
    const handleEditProjectName = async (id: string, name: string) => {
        try {
            await updateProject(id, name);
        } catch (err) {
            console.error("Failed to update project:", err);
            toast.error("Error al actualizar el proyecto");
        }
    };

    // Handle project deletion
    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id);
        } catch (err) {
            console.error("Failed to delete project:", err);
            toast.error("Error al eliminar el proyecto");
        }
    };

    // Navigate back to the previous route
    const goBack = () => {
        navigate(-1);
    };

    // Add a null slot at the end to render an "add new project" UI
    const projectsWithAddSlot = [...projects, null];

    return {
        projects,
        loading,
        newProjectName,
        setNewProjectName,
        isFormVisible,
        setIsFormVisible,
        isSubmitting,
        handleAddProject,
        handleEditProjectName,
        handleDeleteProject,
        goBack,
        projectsWithAddSlot,
    };
}
