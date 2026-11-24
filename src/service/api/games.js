const API_URL = import.meta.env.VITE_API_URL

export const getGames = ({ pageSize, current } = {}) => {
  const query = new URLSearchParams({
    limit: pageSize || 10,
    skip: (current || 1) - 1
  })

  return fetch(`${API_URL}/games?${query}`, {
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(response => response.json())
}

export const createGame = data =>
  fetch(`${API_URL}/games`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  })
