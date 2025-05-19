import ProjectCard from "../components/projects/project-card";
import { ArrowLeft, Check, Loader2, Plus } from "lucide-react";
import AutoResizeTextArea from "../components/ui/text-area";
import Layout from "../layout/primary-layout";
import { useProjectsManager } from "../hooks/projects/useHandlerProject";

export default function ProjectsPage() {
    const {
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
    } = useProjectsManager();

    return (
        <Layout title="Taskly | Mis proyectos">
            <div className="bg-gray-100 min-h-screen pb-12 pt-4 dark:bg-background-dark">
                <div className="max-w-7xl mx-auto flex items-center">
                    <button
                        onClick={goBack}
                        className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer dark:hover:bg-gray-900"
                        aria-label="Volver atrás"
                    >
                        <ArrowLeft
                            size={18}
                            className="text-gray-600 dark:text-white"
                        />
                    </button>
                    {loading && (
                        <Loader2
                            size={16}
                            className="animate-spin mr-2 dark:text-white"
                        />
                    )}
                    <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                        Mis Proyectos
                    </h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    {/* Grid de proyectos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {projectsWithAddSlot.map((proj) =>
                            proj
                                ? (
                                    <ProjectCard
                                        key={proj.id}
                                        project={proj}
                                        onUpdateProject={handleEditProjectName}
                                        onDeleteProject={handleDeleteProject}
                                    />
                                )
                                : (
                                    // Tarjeta para añadir proyecto
                                    <div
                                        key="add-project"
                                        className={`bg-white h-[fit-content] border border-dashed rounded-lg p-4 flex flex-col justify-center hover:border-blue-400 hover:shadow-sm transition-all duration-200  ${
                                            isFormVisible
                                                ? "border-blue-400"
                                                : "border-gray-200"
                                        } dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700`}
                                        onClick={() =>
                                            !isFormVisible &&
                                            setIsFormVisible(true)}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !isFormVisible
                                            ) {
                                                setIsFormVisible(true);
                                            }
                                        }}
                                        aria-label="Añadir proyecto"
                                        data-cy="add-project-button"
                                    >
                                        {isFormVisible
                                            ? (
                                                <div className="p-1">
                                                    <div className="mb-3">
                                                        <AutoResizeTextArea
                                                            value={newProjectName}
                                                            onChange={(e) =>
                                                                setNewProjectName(
                                                                    e.target
                                                                        .value,
                                                                )}
                                                            placeholder="Nombre del proyecto"
                                                            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2 text-sm dark:border-gray-700 dark:text-white"
                                                            autoFocus
                                                            minHeight="4.5rem"
                                                            maxHeight="10rem"
                                                            data-cy="project-name-input"
                                                        />
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={handleAddProject}
                                                            disabled={isSubmitting}
                                                            className="flex items-center justify-center flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1.5 px-3 rounded-md transition-colors cursor-pointer"
                                                            data-cy="save-project-button"
                                                        >
                                                            {isSubmitting
                                                                ? (
                                                                    <Loader2
                                                                        size={16}
                                                                        className="animate-spin"
                                                                    />
                                                                )
                                                                : (
                                                                    <>
                                                                        <Check
                                                                            size={14}
                                                                            className="mr-1"
                                                                        />{" "}
                                                                        Guardar
                                                                    </>
                                                                )}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setIsFormVisible(
                                                                    false,
                                                                );
                                                                setNewProjectName(
                                                                    "",
                                                                );
                                                            }}
                                                            className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm py-1.5 px-3 rounded-md transition-colors cursor-pointer dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className="flex flex-col items-center justify-center h-32 text-center cursor-pointer">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2 dark:bg-gray-700">
                                                        <Plus
                                                            size={20}
                                                            className="text-blue-500 dark:text-white"
                                                        />
                                                    </div>
                                                    <span className="text-gray-500 text-sm font-medium dark:text-white">
                                                        Nuevo proyecto
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                )
                        )}
                    </div>

                    {/* Mensaje cuando no hay proyectos */}
                    {projects.length === 0 && !loading && (
                        <div className="mt-8 text-center text-gray-500">
                            No tienes proyectos activos. ¡Crea uno nuevo!
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
