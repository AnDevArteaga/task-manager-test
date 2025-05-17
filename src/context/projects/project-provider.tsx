import type { ReactNode } from "react";
import { ProjectsContext } from "./project-context";
import { useProjectsLogic } from "../../hooks/projects/useFetchingProject";

interface ProjectsProviderProps {
    children: ReactNode;
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
    const projectsState = useProjectsLogic();

    return (
        <ProjectsContext.Provider value={projectsState}>
            {children}
        </ProjectsContext.Provider>
    );
};
