import { useEffect, useRef, useState } from "react"
import { useTasksContext } from "../../context/tasks/useTaskContext"
import { AlertCircle, Clock, Flag } from "lucide-react"
import type { ReactNode } from "react"
import type { Task } from "../../interfaces/task.interface"
import { toast } from "react-toastify";

interface UseTaskModalLogicProps {
  taskId: string
  onClose: () => void
}

//Hook to handle task modal
export function useTaskModalLogic({ taskId, onClose }: UseTaskModalLogicProps) {
  const { tasks, updateTask, deleteTask } = useTasksContext()
  const task = tasks.find((t) => t.id === taskId)

  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editingDescription, setEditingDescription] = useState(false)
  const textareaDescRef = useRef<HTMLTextAreaElement | null>(null)
  const [priority, setPriority] = useState<Task["priority"] | "">("")
  const [priorityEditing, setPriorityEditing] = useState(false)
  const [dueDate, setDueDate] = useState("")
  const [completed, setCompleted] = useState(false)
  const [confirmOpenPopup, setConfirmOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  // Initialize states when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      setDescription(task.description || "")
      setPriority(task.priority || "")
      setDueDate(task.due_date?.slice(0, 10) || "")
      setCompleted(task.status === "Completada")
    }
  }, [task])

  // Close modal with escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Auto adjust textarea description height
  useEffect(() => {
    if (textareaDescRef.current && editingDescription) {
      textareaDescRef.current.style.height = "auto"
      textareaDescRef.current.style.height =
        textareaDescRef.current.scrollHeight + "px"
    }
  }, [description, editingDescription])

  // Save changes
  const handleSave = async () => {
    if (!task) return
    setLoading(true)
    try {
      await updateTask(taskId, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority: priority || undefined,
        due_date: dueDate || undefined,
        status: completed ? "Completada" : "Pendiente",
      })
      setEditingTitle(false)
      setEditingDescription(false)
      setPriorityEditing(false)
      onClose()
    } catch (error) {
      toast.error("Error guardando la tarea")
      console.error(error)
    } finally {
      setLoading(false)
  }}

  // Delete task
  const handleDelete = async () => {
    if (!task) return
      try {
        await deleteTask(taskId)
        onClose()
      } catch (error) {
        toast.error("Error al eliminar la tarea")
        console.error(error)
      }
    
  }

  // Cancel description edit
  const cancelDescriptionEdit = () => {
    if (!task) return
    setDescription(task.description || "")
    setEditingDescription(false)
  }

  // Get priority color
  const getPriorityColor = (prio: string): string => {
    switch (prio) {
      case "Alta":
        return "text-red-600 dark:text-red-200"
      case "Media":
        return "text-yellow-600 dark:text-yellow-200"
      case "Baja":
        return "text-green-600 dark:text-green-200"
      default:
        return "text-gray-600 dark:text-gray-200"
    }
  }

  // Get priority background
  const getPriorityBgColor = (prio: string): string => {
    switch (prio) {
      case "Alta":
        return "bg-red-100 border-red-200 dark:bg-red-500/20 dark:border-red-400"
      case "Media":
        return "bg-yellow-100 border-yellow-200 dark:bg-yellow-500/20 dark:border-yellow-400"
      case "Baja":
        return "bg-green-100 border-green-200 dark:bg-green-500/20 dark:border-green-400"
      default:
        return "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    }
  }

  // Get priority icon
  const getPriorityIcon = (prio: string): ReactNode => {
    switch (prio) {
      case "Alta":
        return <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
      case "Media":
        return <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
      case "Baja":
        return <Flag size={16} className="text-green-600 dark:text-green-400" />
      default:
        return <Flag size={16} className="text-gray-400 dark:text-gray-300" />
    }
  }

  return {
    editingTitle,
    setEditingTitle,
    title,
    setTitle,
    description,
    setDescription,
    editingDescription,
    setEditingDescription,
    textareaDescRef,
    priority,
    setPriority,
    priorityEditing,
    setPriorityEditing,
    dueDate,
    setDueDate,
    completed,
    setCompleted,
    handleSave,
    handleDelete,
    cancelDescriptionEdit,
    getPriorityColor,
    getPriorityBgColor,
    getPriorityIcon,
    setConfirmOpenPopup,
    confirmOpenPopup,
    loading,
  }
}
