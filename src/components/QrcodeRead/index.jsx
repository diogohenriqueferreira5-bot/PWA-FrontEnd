import { useState } from 'react';
import { Scanner } from "@yudiel/react-qr-scanner";
import styles from './styles.module.scss';

function QrcodeRead({ setDataLogin }) {
    const [scanData, setScanData] = useState(null);
    const [scanError, setScanError] = useState('');

    const handleScan = (results) => {
        if (scanData) return;

        const result = results?.[0]?.rawValue;
        if (!result) return;

        const parsed = { qrToken: result };
        setScanError('');
        setScanData(parsed);
        setDataLogin(parsed);
    };

    return (
        <div className={styles.qrCodeReader}>
            {!scanData && (
                <Scanner
                    onScan={handleScan}
                    onError={() => setScanError('Não foi possível aceder à câmara. Verifique as permissões do navegador.')}
                    constraints={{ facingMode: 'user' }}
                    scanDelay={300}
                />
            )}
            {scanError && <p role="alert">{scanError}</p>}
            {scanData && <p>QR Code lido. A iniciar sessão...</p>}
        </div>
    );
}

export default QrcodeRead;