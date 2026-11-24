const API_URL = import.meta.env.VITE_API_URL

export const getUsers = ({ pageSize, current } = {}) => {
  const query = new URLSearchParams({
    limit: pageSize || 10,
    skip: (current || 1) - 1
  })

  return fetch(`${API_URL}/users?${query}`, {
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(response => response.json())
}

export const createUser = data =>
  fetch(`${API_URL}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  })
