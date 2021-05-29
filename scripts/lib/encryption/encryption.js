const { cycledCharCodeAt, hexToString, stringToHex } = require('./utils');
const fs = require('fs');

function encrypt(str, secret) {
    return stringToHex(
        str
            .split('')
            .map((t, i) => String.fromCharCode(t.charCodeAt() + cycledCharCodeAt(secret, i)))
            .join('')
    );
}

function decrypt(encryptedHexStr, secret) {
    return hexToString(encryptedHexStr)
        .split('')
        .map((t, i) => String.fromCharCode(t.charCodeAt() - cycledCharCodeAt(secret, i)))
        .join('');
}

function getSecret() {
    try {
        const data = fs.readFileSync('/home/john/PassVault/secret.key');
        //console.log(data);
        return data.toString();
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    encrypt,
    decrypt,
    getSecret,
};
