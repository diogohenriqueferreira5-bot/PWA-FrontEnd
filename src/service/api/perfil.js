export const getPerfil = () =>
  fetch("/api/users/perfil", {
    headers: { Accept: "application/json" },
    credentials: "include",
  }).then((response) => response.json());