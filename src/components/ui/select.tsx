import React from "react";

// Generic select component
interface Option {
    value: string;
    label: string;
}

interface GenericSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
}

const GenericSelect: React.FC<GenericSelectProps> = ({
    value,
    onChange,
    options,
    autoFocus = false,
    disabled = false,
    className = "",
    placeholder,
}) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm ${className} dark:border-gray-700 dark:text-white`}
            autoFocus={autoFocus}
            disabled={disabled}
        >
            {placeholder && (
                <option value="" disabled className="dark:text-gray-800">
                    {placeholder}
                </option>
            )}
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="dark:text-gray-800">
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default GenericSelect;
