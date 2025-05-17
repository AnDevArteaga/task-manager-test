import { Check, Edit, X } from "lucide-react";
import AutoResizeTextArea from "../../ui/text-area";

interface Props {
    title: string;
    setTitle: (t: string) => void;
    setEditingTitle: (b: boolean) => void;
    editingTitle: boolean;
}

// Title component
export default function Title(
    { title, setTitle, setEditingTitle, editingTitle }: Props,
) {
    return (
        <div className="flex items-start gap-3 mb-6">
            {editingTitle
                ? (
                    <div className="w-full">
                        <AutoResizeTextArea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-200 rounded-lg shadow-sm px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl font-medium transition-all duration-200 dark:border-gray-700 dark:text-white"
                            autoFocus
                            minHeight="4.5rem"
                            maxHeight="10rem"
                            submitOnEnter={true}
                            placeholder="Título de la tarea..."
                        />
                        <div className="flex justify-end mt-2">
                            <X
                                size={16}
                                onClick={() => setEditingTitle(false)}
                                className="text-gray-600 hover:text-gray-800 mr-2 flex items-center hover:bg-gray-100 transition-colors duration-200 cursor-pointer dark:text-white dark:hover:bg-gray-800 rounded-md"
                            />
                            <Check
                                size={16}
                                onClick={() => setEditingTitle(false)}
                                className="text-blue-600 hover:text-blue-800 flex items-center hover:bg-blue-50 transition-colors duration-200 cursor-pointer rounded-md dark:text-white dark:hover:bg-gray-800"
                            />
                        </div>
                    </div>
                )
                : (
                    <>
                        <h2
                            className="text-xl font-bold break-words flex-grow leading-tight text-gray-800 dark:text-white"
                            title={title}
                        >
                            {title}
                        </h2>
                        <button
                            onClick={() => setEditingTitle(true)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer dark:text-white dark:hover:bg-gray-800"
                            aria-label="Editar título"
                        >
                            <Edit size={18} />
                        </button>
                    </>
                )}
        </div>
    );
}
