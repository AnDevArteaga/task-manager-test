export interface Project {
    id: string;
    name: string;
    created_at: string;
}

export interface ProjectsContextType {
    projects: Project[];
    loading: boolean;
    fetchProjects: () => Promise<void>;
    addProject: (name: string) => Promise<void>;
    updateProject: (id: string, name: string) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}