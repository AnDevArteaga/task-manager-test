import supabase from "./supabase-client";
import type { Task } from "../interfaces/task.interface";


export async function getAllTasks(): Promise<Task[]> {
    const { data, error } = await supabase.from("tasks").select("*").order(
        "created_at",
        { ascending: true },
    );
    if (error) throw error;
    return data || [];
}

export async function getTasks(projectId: string): Promise<Task[]> {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", projectId)
        .order("due_date", { ascending: true });
    if (error) throw error;
    return data;
}

export async function createTask(
    task: Omit<Task, "id" | "created_at">,
): Promise<Task> {
    const { data, error } = await supabase
        .from("tasks")
        .insert([task])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateTask(
    id: string,
    updates: Partial<Omit<Task, "id" | "project_id" | "created_at">>,
): Promise<Task> {
    const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteTask(id: string): Promise<void> {
    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    if (error) throw error;
}
