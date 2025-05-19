import React from "react";
import { Loader2 } from "lucide-react";

// Icon button component
interface IconButtonProps {
    icon: React.ElementType;
    iconSize?: number;
    text?: string;
    onClick: () => void;
    className?: string;
    ariaLabel?: string;
    disabled?: boolean;
    loader?: boolean;
}

export default function IconButton({
    icon: Icon,
    iconSize = 16,
    onClick,
    className = "",
    ariaLabel,
    disabled,
    loader,
     ...props
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1 px-2 py-2 cursor-pointer text-xs rounded-lg transition-colors duration-200 ${className}`}
            aria-label={ariaLabel}
            type="button"
            disabled={disabled}
            {...props}
        >
            {loader ? (
                <Loader2
                    size={iconSize}
                    className="animate-spin"
                />
            ) : (
                <Icon size={iconSize} />
            )}
        </button>
    );
}
