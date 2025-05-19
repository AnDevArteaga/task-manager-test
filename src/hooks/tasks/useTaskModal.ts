import { useEffect, useRef, useState } from "react";
import { useTasksContext } from "../../context/tasks/useTaskContext";
import type { Task } from "../../interfaces/task.interface";

interface UseTaskModalLogicProps {
  taskId: string;
  onClose: () => void;
}

interface State {
  editingTitle: boolean;
  editingDescription: boolean;
  priorityEditing: boolean;
  confirmOpenPopup: boolean;
  loading: boolean;
}

interface FormValues {
  title: string;
  description: string;
  priority: Task["priority"] | "";
  dueDate: string;
  completed: boolean;
}

export function useTaskModalLogic({ taskId, onClose }: UseTaskModalLogicProps) {
  const { tasks, updateTask, deleteTask, loadingState } = useTasksContext();
  const task = tasks.find((t) => t.id === taskId);

  const textareaDescRef = useRef<HTMLTextAreaElement | null>(null);

  const [state, setState] = useState<State>({
    editingTitle: false,
    editingDescription: false,
    priorityEditing: false,
    confirmOpenPopup: false,
    loading: false,
  });

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    completed: false,
  });

    const updateFormValue = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateState = <K extends keyof State>(
    key: K,
    value: State[K]
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Initialize fields when task changes
  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        dueDate: task.due_date?.slice(0, 10) || "",
        completed: task.status === "Completada",
      });
    }
  }, [task]);

  // Close modal with Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Ajustar altura del textarea
  useEffect(() => {
    if (textareaDescRef.current && state.editingDescription) {
      const textarea = textareaDescRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formValues.description, state.editingDescription]);

  const handleChange = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const setEditing = <K extends keyof State>(key: K, value: State[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!task) return;
    setEditing("loading", true);

    try {
      await updateTask(taskId, {
        title: formValues.title.trim(),
        description: formValues.description.trim() || undefined,
        priority: formValues.priority || undefined,
        due_date: formValues.dueDate || undefined,
        status: formValues.completed ? "Completada" : "Pendiente",
      });
      setEditing("editingTitle", false);
      setEditing("editingDescription", false);
      setEditing("priorityEditing", false);
      onClose();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    } finally {
      setEditing("loading", false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    try {
      await deleteTask(taskId);
      updateState("confirmOpenPopup", false);
      onClose();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };



  return {
    formValues,
    state,
    updateFormValue,
    updateState,
    textareaDescRef,
    handleChange,
    setEditing,
    handleSave,
    handleDelete,
    loadingState,
  };
}
