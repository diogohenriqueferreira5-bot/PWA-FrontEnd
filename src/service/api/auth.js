
const API_URL = import.meta.env.VITE_API_URL;

export const login = (data) =>
    fetch(`${API_URL}/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
    }).then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Erro ao iniciar sessão.");
        }

        return result;
    });

export const getQrLoginToken = () =>
    fetch(`${API_URL}/auth/qr-token`, {
        headers: { Accept: "application/json" },
        credentials: "include",
    }).then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Não foi possível gerar o QR Code.");
        }

        return data;
    });
