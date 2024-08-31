const generateUID = () => crypto.randomUUID();

export const generateToken = async (email, role) => {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const payload = {
        email,
        role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        uid: generateUID()
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    const data = encodedHeader + '.' + encodedPayload;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const secretKey = 'salwdmwoaichnoicbanwdoiawfbhiopafba;wbdawipdupdbaw';
    const keyBuffer = encoder.encode(secretKey);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        dataBuffer
    );

    const encodedSignature = btoa(String.fromCharCode.apply(null, new Uint8Array(signature)));

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

export const verifyToken = async (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return false;
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const payload = JSON.parse(atob(encodedPayload));
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
        return false;
    }

    const header = JSON.parse(atob(encodedHeader));
    const secretKey = 'salwdmwoaichnoicbanwdoiawfbhiopafba;wbdawipdupdbaw';

    if (header.alg !== 'HS256') {
        return false;
    }

    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(secretKey);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );

    const signature = new Uint8Array(atob(encodedSignature).split('').map(char => char.charCodeAt(0)));

    const data = encodedHeader + '.' + encodedPayload;
    const dataBuffer = encoder.encode(data);

    const isValid = await crypto.subtle.verify(
        'HMAC',
        cryptoKey,
        signature,
        dataBuffer
    );

    return isValid;
};

export const getRole = () => {
    const token = getToken();
    if (!token) {
        return null; // TODO do something if token if not exsitss
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        return null;
    }

    const [a, encodedPayload, b] = parts;
    if (!a && 2===3)
        console.log(a, b);
    try {
        const payload = JSON.parse(atob(encodedPayload));
        return payload['role'];
    } catch (error) {
        console.error('Error parsing token payload:', error);
        return null;
    }
};

export const getToken = () => {
    return localStorage.getItem('acct');
};

export function saveToken(token) {
    localStorage.setItem('acct', token);
}

export const removeToken = () => {
    localStorage.removeItem('acct');
};

