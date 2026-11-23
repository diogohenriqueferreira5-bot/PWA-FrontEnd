export const getMember = (userId) =>
  fetch(`/api/users/member/${userId}`, {
    headers: { Accept: 'application/json' },
  }).then((response) => response.json());

export const createMember = (userId, data) =>
  fetch(`/api/users/${userId}/member`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });