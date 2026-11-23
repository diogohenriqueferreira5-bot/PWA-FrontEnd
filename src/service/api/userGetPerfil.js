import { useCallback, useEffect, useState } from "react";

export const useGetPerfil = (service) => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({
        data: {},
    });

    const fetchingData = useCallback(() => {
        setLoading(true);

        service()
            .then((response) => {
                const { data = {}} = response;
                setUser({
                    data: data, 
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [service]);

    useEffect(() => {
        fetchingData();
    }, []);

    return { 
        user,
        isError,
        isLoading,
        load: fetchingData,
    };
};