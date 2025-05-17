import supabase from "./supabase-client";

// get all projects
export async function getProjects() {
    const { data, error } = await supabase.from("projects").select("*").order(
        "created_at",
        { ascending: true },
    );
    if (error) throw error;
    return data;
}

// get a project by id
export async function createProject(name: string) {
    const { data, error } = await supabase.from("projects").insert([{ name }])
        .select().single();
    if (error) throw error;
    return data;
}

// update a project by id - only change name
export async function updateProject(id: string, name: string) {
    const { data, error } = await supabase.from("projects").update({ name }).eq(
        "id",
        id,
    ).select().single();
    if (error) throw error;
    return data;
}

// delete a project by id
export async function deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
}
