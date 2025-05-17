import { Calendar } from "lucide-react";

// Date component
interface Props {
    dueDate: string;
    setDueDate: (d: string) => void;
}

export default function Date({ dueDate, setDueDate }: Props) {
    return (
        <div className="flex-1">
            <label
                htmlFor="due-date"
                className="block mb-2 font-medium text-gray-700 flex items-center gap-1 text-xs dark:text-white"
            >
                <Calendar size={12} /> Fecha de vencimiento
            </label>
            <div className="relative">
                <input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm dark:border-gray-700 dark:text-white "
               />   
            </div>
        </div>
    );
}
