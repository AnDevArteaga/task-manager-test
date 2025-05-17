import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectsContext } from "../../context/projects/useProjectContext";

//Hook to handlers project
export function useProjectsManager() {
    const {
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
    } = useProjectsContext();

    const [newProjectName, setNewProjectName] = useState("");
    const [adding, setAdding] = useState(false);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const navigate = useNavigate();

    // Handle add project
    const handleAddProject = async () => {
        if (!newProjectName.trim()) return;

        try {
            setIsAddingProject(true);
            await addProject(newProjectName.trim());
            setNewProjectName("");
            setAdding(false);
        } catch (error) {
            console.error("Error al añadir proyecto:", error);
        } finally {
            setIsAddingProject(false);
        }
    };

    // Only edit name if project
    const onEditNameProject = async (id: string, name: string) => {
        await updateProject(id, name);
    };

    // Only delete if project
    const onDeleteProject = async (id: string) => {
        await deleteProject(id);
    };

    // Go back to back route
    const goBack = () => {
        navigate(-1);
    };

// Build array with projects + slot to add project at the end
    const projectsWithAddSlot = [...projects, null];

    return {
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        newProjectName,
        setNewProjectName,
        adding,
        setAdding,
        isAddingProject,
        setIsAddingProject,
        navigate,
        handleAddProject,
        onEditNameProject,
        onDeleteProject,
        goBack,
        projectsWithAddSlot,
    };
}
