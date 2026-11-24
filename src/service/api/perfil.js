const API_URL = import.meta.env.VITE_API_URL

export const getPerfil = () =>
  fetch(`${API_URL}/users/perfil`, {
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(async response => {
    if (!response.ok) {
      throw new Error(`Erro ao obter perfil: ${response.status}`)
    }

    return response.json()
  })
