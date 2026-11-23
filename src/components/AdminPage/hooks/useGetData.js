import { useEffect, useState, useCallback } from "react";

export const useGetData = (service, pageSize, current) => {
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    data: [],
    pagination: { current: 1, pageSize: 10, total: 0 },
  });

  const fetchingData = useCallback(() => {
    setLoading(true);
    setError(null);

    return service({ pageSize, current })
      .then((response) => {
        const records = response.data ?? response.games ?? response.users ?? [];
        if (response.auth === false) {
          throw new Error(response.message || "Pedido não autorizado");
        }
        setData({
          data: Array.isArray(records) ? records : [],
          pagination: {
            current: current || 1,
            pageSize: response.pagination?.pageSize ?? pageSize ?? 10,
            total: response.pagination?.total ?? records.length,
            hasMore: response.pagination?.hasMore ?? false,
          },
        });
        return response;
      })
      .catch((error) => {
        console.error("Erro ao obter dados:", error);
        setError(error);
        throw error;
      })
      .finally(() => setLoading(false));
  }, [service, pageSize, current]);

  useEffect(() => {
    fetchingData().catch(() => {});
  }, [fetchingData]);

  return { data, isError, isLoading, load: fetchingData };
};
