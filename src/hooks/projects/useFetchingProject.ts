import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/project.interface";
import * as projectService from "../../services/project-service";
import { toast } from "react-toastify";


//Hook to fetch project
export function useProjectsLogic() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Fetch all projects
    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await projectService.getProjects();
            setProjects(data);
        } catch {
            setError("Error loading projects");
        } finally {
            setLoading(false);
        }
    };

    // Add a new project
    const addProject = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const newProject = await projectService.createProject(name);
            setProjects((prev) => [...prev, newProject]); // Add new project to the list - allways with one copy of the array or state
            toast.success("Proyecto creado correctamente");
        } catch {
            setError("Error creating project");
            toast.error("Error creando proyecto");
        } finally {
            setLoading(false);
        }
    };
    // Update a project
    const updateProject = async (id: string, name: string) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await projectService.updateProject(id, name);
            setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
            toast.success("Proyecto actualizado correctamente");
        } catch {
            setError("Error updating project");
            toast.error("Error actualizando proyecto");
        } finally {
            setLoading(false);
        }
    };
    // Delete a project
    const deleteProject = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await projectService.deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
            toast.success("Proyecto eliminado correctamente");
        } catch {
            setError("Error eliminando proyecto");
            toast.error("Error eliminando proyecto");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    

    return {
        projects,
        loading,
        error,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
    };
}
