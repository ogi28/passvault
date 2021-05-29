import {cycledCharCodeAt, hexToString, stringToHex} from './utils.js';

export function encrypt(str, secret) {
    return stringToHex(
        str
            .split('')
            .map((t, i) =>
                String.fromCharCode(t.charCodeAt() + cycledCharCodeAt(secret, i))
            )
            .join('')
    );
}

export function decrypt(encryptedHexStr, secret) {
    return hexToString(encryptedHexStr)
        .split('')
        .map((t, i) =>
            String.fromCharCode(t.charCodeAt() - cycledCharCodeAt(secret, i))
        )
        .join('');
}
