export const login = (data) =>
    fetch("/api/auth/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
    }).then((response) => response.json());

export const getQrLoginToken = () =>
    fetch("/api/auth/qr-token", {
        headers: { Accept: "application/json" },
    }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Não foi possível gerar o QR Code.");
        }
        return data;
    });