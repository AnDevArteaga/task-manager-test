import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "dark-mode-enabled";

export default function DarkModeToggleSwitch() {
    // Load saved value or system preference if there is no save
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
            return saved === "true";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem(STORAGE_KEY, "true");
        } else {
            root.classList.remove("dark");
            localStorage.setItem(STORAGE_KEY, "false");
        }
    }, [isDark]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 dark:text-white">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)}
                    className="sr-only peer"
                    data-cy="darkmode-toggle"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:peer-checked:bg-blue-500 peer-checked:bg-blue-600 transition-colors duration-300" />
                <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-100 w-5 h-5 rounded-full transition-all duration-300 transform peer-checked:translate-x-full" />
            </label>
        </div>
    );
}
