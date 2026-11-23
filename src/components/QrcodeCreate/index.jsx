import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { getQrLoginToken } from '../../service/api/auth';
import styles from './styles.module.scss';

function Qrcode() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadQrToken = () => {
            getQrLoginToken()
                .then(({ qrToken }) => {
                    if (!qrToken) {
                        throw new Error('O servidor não devolveu um token de login.');
                    }
                    if (isMounted) {
                        setValue(qrToken);
                        setError('');
                    }
                })
                .catch((requestError) => {
                    if (isMounted) {
                        setValue('');
                        setError(requestError.message || 'Não foi possível gerar o QR Code.');
                    }
                });
        };

        loadQrToken();
        const refreshTimer = window.setInterval(loadQrToken, 90_000);

        return () => {
            isMounted = false;
            window.clearInterval(refreshTimer);
        };
    }, []);

    return (
        <div className={styles.qrCodeCreate}>
            {value ? (
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox="0 0 256 256"
                />
            ) : (
                <p role="alert">{error || 'A gerar QR Code...'}</p>
            )}
        </div>
    );
}

export default Qrcode;