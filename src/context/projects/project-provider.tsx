import type { ReactNode } from "react";
import { ProjectsContext } from "./project-context";
import { useFetchingProject } from "../../hooks/projects/useFetchingProject";

interface ProjectsProviderProps {
    children: ReactNode;
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
    const projectsState = useFetchingProject();

    return (
        <ProjectsContext.Provider value={projectsState}>
            {children}
        </ProjectsContext.Provider>
    );
};
