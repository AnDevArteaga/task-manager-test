import { forwardRef, useEffect, useRef } from "react";

// Text area component with auto-resize and custom styling
interface AutoResizeTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    minHeight?: string;
    maxHeight?: string;
    className?: string;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    submitOnEnter?: boolean;
    onSubmit?: () => void;
}

const AutoResizeTextArea = forwardRef<
    HTMLTextAreaElement,
    AutoResizeTextAreaProps
>(
    (
        {
            value,
            onChange,
            minHeight = "2.5rem",
            maxHeight = "15rem",
            className = "",
            placeholder = "",
            onKeyDown,
            submitOnEnter = false,
            onSubmit,
            ...props
        },
        ref,
    ) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const combinedRef = (node: HTMLTextAreaElement) => {
            // Handle both the passed ref and the internal ref            textareaRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        // Automatically adjust height when content changes
        useEffect(() => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            // Reset height
            textarea.style.height = "auto";

            // Calculate new height
            const newHeight = Math.min(
                Math.max(textarea.scrollHeight, parseInt(minHeight)),
                parseInt(maxHeight),
            );

            // Apply new height
            textarea.style.height = `${newHeight}px`;

            // Add scrollbar if content exceeds maxHeight
            textarea.style.overflowY =
                textarea.scrollHeight > parseInt(maxHeight) ? "auto" : "hidden";
        }, [value, minHeight, maxHeight]);

        // Handle specific keys like Enter and Escape - Optional
        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            // If submitOnEnter is active, Enter without Shift saves the changes - Some combinations I came up with :)
            if (submitOnEnter && e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (onSubmit) {
                    onSubmit();
                }
            }

            // Call the original onKeyDown handler if it exists
            if (onKeyDown) {
                onKeyDown(e);
            }
        };

        return (
            <textarea
                ref={combinedRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`resize-none overflow-hidden ${className} text-xs border-gray-400 focus:border-blue-500 focus:outline-none`}
                style={{
                    minHeight,
                    maxHeight,
                }}
                {...props}
            />
        );
    },
);

AutoResizeTextArea.displayName = "AutoResizeTextArea";

export default AutoResizeTextArea;
