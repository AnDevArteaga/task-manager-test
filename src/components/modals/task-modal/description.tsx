import { AlignLeft, Check, Edit, FileText } from "lucide-react";
import Button from "../../ui/button";

interface Props {
    description: string;
    setDescription: (d: string) => void;
    textareaDescRef: React.RefObject<HTMLTextAreaElement | null>;
    setEditingDescription: (b: boolean) => void;
    editingDescription: boolean;
}

// Description component
export default function Description(
    {
        description,
        setDescription,
        textareaDescRef,
        setEditingDescription,
        editingDescription,
    }: Props,
) {
    return (
        <div className="mb-8">
            <label className="block mb-2 font-medium text-gray-700 flex items-center gap-1 text-xs dark:text-white">
                <AlignLeft size={12} /> Descripción
            </label>
            {editingDescription
                ? (
                    <div className="relative">
                        <textarea
                            ref={textareaDescRef}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full text-xs border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200 dark:border-gray-700 dark:text-white"
                            autoFocus
                            placeholder="Describe los detalles de esta tarea..."
                        />
                        <div className="flex gap-2 mt-3 justify-end items-center">
                            <span className="text-gray-700 dark:text-white text-xs">
                                Recuerde guardar la descripción
                            </span>

                            <Button
                                icon={Check}
                                iconSize={16}
                                text="Guardar"
                                onClick={() => setEditingDescription(false)}
                                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                                aria-label="Guardar descripción"
                            />
                        </div>
                    </div>
                )
                : description
                ? (
                    <div
                        className="relative group border border-gray-200 rounded-lg p-4 whitespace-pre-wrap break-words cursor-pointer hover:bg-gray-50 transition-all duration-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        onClick={() => setEditingDescription(true)}
                        title="Editar descripción"
                    >
                        <div className="text-gray-700 text-xs dark:text-white">
                            {description}
                        </div>
                        <button
                            className="absolute top-2 right-2 text-gray-700 opacity-0 group-hover:opacity-100 hover:text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-all duration-200 dark:text-white dark:hover:bg-gray-800"
                            aria-label="Editar descripción"
                        >
                            <Edit size={12} />
                        </button>
                    </div>
                )
                : (
                    <button
                        onClick={() => setEditingDescription(true)}
                        className="flex items-center gap-2 text-blue-600 py-2 px-4 rounded-lg border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 w-full justify-center text-xs cursor-pointer"
                        aria-label="Añadir descripción"
                    >
                        <FileText size={16} /> Añadir descripción
                    </button>
                )}
        </div>
    );
}
