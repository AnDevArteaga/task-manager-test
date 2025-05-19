import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/project.interface";
import * as projectService from "../../services/project-service";
import { toast } from "react-toastify";

// Custom hook to encapsulate project logic
export function useFetchingProject() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    // Utility to handle async operations with loading and error toast
    const withLoading = async (
        operation: () => Promise<void>,
        errorMessage: string,
    ) => {
        setLoading(true);
        try {
            await operation();
        } catch {
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all projects from the API
    const fetchProjects = async () => {
        await withLoading(async () => {
            const data = await projectService.getProjects();
            setProjects(data);
        }, "Error al cargar proyectos");
    };

    // Create a new project
    const addProject = async (name: string) => {
        await withLoading(async () => {
            const newProject = await projectService.createProject(name);
            setProjects((prev) => [...prev, newProject]); // Append new project
            toast.success("Proyecto creado correctamente");
        }, "Error creando proyecto");
    };

    // Update an existing project
    const updateProject = async (id: string, name: string) => {
        await withLoading(async () => {
            const updated = await projectService.updateProject(id, name);
            setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
            toast.success("Proyecto actualizado correctamente");
        }, "Error actualizando proyecto");
    };

    // Delete a project
    const deleteProject = async (id: string) => {
        await withLoading(async () => {
            await projectService.deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
            toast.success("Proyecto eliminado correctamente");
        }, "Error eliminando proyecto");
    };

    // Load projects on initial render
    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
    };
}
