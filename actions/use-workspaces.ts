import { useRetrieveWorkspacesQuery } from "@/redux/features/auth-api-slice"

export const getWorkSpaces = () => {
    const {data, error, isLoading, refetch } = useRetrieveWorkspacesQuery();
    
    if (error) {
        console.error("Error fetching workspaces API:", error);
    } else {
        console.log("Workspaces data:", data);
    }
    return {
        workspaces: data || [],
        error,
        isLoading,
        refetch
    };
};