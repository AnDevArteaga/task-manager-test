import React from "react";

//Specific select component for filters
interface Option {
    value: string;
    label: string;
}

interface SelectSimpleProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    className?: string;
}

export default function SelectSimple({
    value,
    onChange,
    options,
    className = "",
}: SelectSimpleProps) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`border-b border-gray-300 px-1 text-xs py-1 mb-2 text-gray-700 focus:border-blue-500 focus:outline-none ${className} dark:border-gray-700 dark:text-white`}
       
       >
            {options.map(({ value: val, label }) => (
                <option key={val} value={val} className="dark:text-gray-900">
                    {label}
                </option>
            ))}
        </select>
    );
}
