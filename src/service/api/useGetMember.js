import { useCallback, useEffect, useState } from 'react';

export const useGetMember = (service, userId) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [member, setMember] = useState({
    data: {},
  });

  const fetchingData = useCallback(() => {
    if (userId) {
      setLoading(true);

      service(userId)
        .then((response) => setMember(response))
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [service, userId]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return {
    member,
    isError,
    isLoading,
    load: fetchingData,
  };
};