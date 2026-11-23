import { useState } from "react";

export const usePostData = (service) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const addData = (payload) => {
    setLoading(true);
    return service(payload)
      .then((response) => {
        if (response.ok) {
          setData(response.json());
          alert('Pedido Efetuado com sucesso');
        } else {
          alert('Error ao adicionar');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    isError,
    isLoading,
    addData,
    postData: addData, // alias para compatibilidade
  };
};