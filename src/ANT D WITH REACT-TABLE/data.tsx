import { useQuery } from "@tanstack/react-query";
import { fetchSummary } from "../API/api";

export const useGrossDeferredCol = () => {


    //(toggle: boolean) => {


    const { isLoading,data } = useQuery<any[], Error>({
        queryKey: ['summary'],
        queryFn: fetchSummary,
        refetchOnWindowFocus : false,
        refetchOnReconnect : false,
        refetchOnMount: false,
    });

    return { data,isLoading };
};
