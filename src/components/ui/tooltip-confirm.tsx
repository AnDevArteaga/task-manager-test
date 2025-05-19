import { Check, Loader2, X } from "lucide-react";

interface ConfirmPopoverProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
    loading?: boolean;
}

//Modal type popover for confirmation to delete or cancel
export default function ConfirmPopover({
    message,
    onConfirm,
    onCancel,
    isOpen,
    loading,
}: ConfirmPopoverProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-gray-50 rounded shadow-lg p-4 max-w-xs text-xs text-gray-700 shadow-md w-full text-center dark:bg-gray-900 dark:text-white">
                <p className="mb-4">{message}</p>
                {loading
                    ? (
                        <div className="flex items-center justify-center">
                            <Loader2
                                size={16}
                                className="animate-spin mr-2 dark:text-white"
                            />
                        </div>
                    )
                    : (
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onConfirm}
                                aria-label="Confirmar"
                                data-cy="confirm-delete-button"
                            >
                                <Check
                                    size={16}
                                    className="text-red-500 hover:text-red-600 transition-colors cursor-pointer dark:text-red-400"
                                />
                            </button>
                            <button
                                onClick={onCancel}
                                aria-label="Cancelar"
                                data-cy="cancel-btn"
                            >
                                <X
                                    size={16}
                                    className="text-gray-700 hover:text-gray-800 transition-colors cursor-pointer dark:text-white"
                                />
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}
