import { useCallback, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export const useAuth = () => {
  const [isValidLogin, setValidLogin] = useState(false)
  const [isFetching, setFeching] = useState(true)

  const hasLogin = useCallback(() => {
    setFeching(true)

    fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Não foi possível validar a autenticação.')
        }

        return response.json()
      })
      .then(response => {
        setValidLogin(response.auth)
      })
      .catch(() => {
        setValidLogin(false)
      })
      .finally(() => {
        setFeching(false)
      })
  }, [])

  return {
    isValidLogin,
    hasLogin,
    isFetching
  }
}
