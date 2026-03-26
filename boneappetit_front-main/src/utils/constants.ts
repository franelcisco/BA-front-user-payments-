export const API_HOST =
    import.meta.env.VITE_API_HOST || 'http://localhost:3000/api';

export const bankList = [
    'Banco de Venezuela',
    'Banco Provincial',
    'Banesco',
    'Banco Mercantil',
    'Banco Nacional de Crédito',
    'Banco Bicentenario',
    'Banco del Tesoro',
    'Banco Exterior',
    'Banco Caroní',
    'Banco Plaza',
    'Banco Fondo Común',
    'Banco Sofitasa',
    'Banco Activo',
    'Banco Agrícola de Venezuela',
    'Banco Venezolano de Crédito',
    '100% Banco',
    'Banco DelSur',
    'Mi Banco',
    'Bancamiga',
    'Bancrecer',
    'Banplus',
    'Citibank',
    'BANFANB',
];

export const documentTypes = [
    'V', // Venezolano
    'E', // Extranjero
    'J', // Jurídico
    'P', // Pasaporte
    'G', // Gobierno
];

export const domiciliacionBanks = [
    { name: 'Banesco', code: 'BA', color: '#00703C' },
    { name: 'Mercantil', code: 'ME', color: '#003DA5' },
    { name: 'BNC', code: 'BN', color: '#1B3A6B' },
    { name: 'Venezuela', code: 'VE', color: '#0066B3' },
    { name: 'Provincial', code: 'PR', color: '#00529B' },
    { name: 'Bancamiga', code: 'BG', color: '#00A651' },
];
