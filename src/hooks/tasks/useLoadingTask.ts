import { useState } from "react";
import { toast } from "react-toastify";
import type { LoadingState } from "../../interfaces/task.interface";


export function useLoadingTask() {
    // Use a single state to hold all loading states
    const [loadingState, setLoadingState] = useState<LoadingState>({
        loadingAllTasks: false,
        loadingForAddTask: false,
        loadingForUpdateTask: false,
        loadingForDeleteTask: false,
    });

    // Utility function to handle async operations with loading state
    const withLoading = async (
        operation: () => Promise<void>,
        errorMessage: string,
        loadingKey: keyof LoadingState
    ) => {
        // Set the loading state for the specific operation
        setLoadingState((prev) => ({
            ...prev,
            [loadingKey]: true,
        }));

        try {
            await operation();
        } catch {
            toast.error(errorMessage);
        } finally {
            // Reset the loading state for the specific operation
            setLoadingState((prev) => ({
                ...prev,
                [loadingKey]: false,
            }));
        }
    };

    return {
        loadingState,
        withLoading,
    };
}
