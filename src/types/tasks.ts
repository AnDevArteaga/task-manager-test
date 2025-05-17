export const estados = ["Todos", "Pendiente", "Completada"] as const;
export type Estado = typeof estados[number];

export const prioridades = ["Todos", "Baja", "Media", "Alta"] as const;
export type Prioridad = typeof prioridades[number];

export type FilterType = "ninguno" | "estado" | "prioridad";

export const filterTypeOptions = [
    { value: "ninguno", label: "Sin filtro" },
    { value: "estado", label: "Filtrar por estado" },
    { value: "prioridad", label: "Filtrar por prioridad" },
];

export const estadoOptions = [
    { value: "Todos", label: "Todos" },
    { value: "Pendiente", label: "Pendiente" },
    { value: "Completada", label: "Completada" },
];

export const prioridadOptions = [
    { value: "Todos", label: "Todos" },
    { value: "Baja", label: "Baja" },
    { value: "Media", label: "Media" },
    { value: "Alta", label: "Alta" },
];
