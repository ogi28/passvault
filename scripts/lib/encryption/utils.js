function stringToHex(str) {
    let hex;
    let result = '';

    for (let i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += `000${hex}`.slice(-4);
    }

    return result;
}

function hexToString(hexStr) {
    let hexes = hexStr.match(/.{1,4}/g) || [];
    let back = '';

    for (let j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

function cycledCharCodeAt(str, index) {
    return str.charCodeAt(index % str.length);
}

function generateSecretKey() {
    var length = 30;
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}<>?/';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

module.exports = {
    stringToHex,
    hexToString,
    cycledCharCodeAt,
    generateSecretKey: () => generateSecretKey(),
};
