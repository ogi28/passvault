const { cycledCharCodeAt, hexToString, stringToHex, generateSecretKey } = require('./utils');
const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');

const userDataPath = ipcRenderer.sendSync('userDataPath');

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

function shouldCreateSecretKey() {
    const file = path.join(userDataPath, 'secret.key');

    const handleFileAccess = (err) => {
        if (!err) return;
        fs.writeFileSync(file, generateSecretKey());
    };
    // Check if the file exists in the current directory.
    fs.access(file, fs.constants.F_OK, handleFileAccess);
}

function getSecret() {
    try {
        const secretKeyPath = path.join(userDataPath, 'secret.key');

        return fs.readFileSync(secretKeyPath).toString();
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    encrypt,
    decrypt,
    getSecret,
    shouldCreateSecretKey: () => shouldCreateSecretKey(),
};
