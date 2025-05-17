export interface Task {
    id: string;
    project_id: string;
    title: string;
    description?: string;
    due_date?: string; // ISO string
    status: "Pendiente" | "Completada";
    priority: "Baja" | "Media" | "Alta" | "Sin prioridad";
    created_at: string;
}

export interface TasksContextType {
    tasks: Task[];
    projectId: string;
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, "id" | "created_at">) => Promise<void>;
    updateTask: (
        id: string,
        updates: Partial<Omit<Task, "id" | "project_id" | "created_at">>,
    ) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}
