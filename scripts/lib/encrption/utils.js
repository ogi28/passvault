export function stringToHex(str) {
  let hex;
  let result = '';

  for (let i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += (`000${hex}`).slice(-4);
  }

  return result;
}

export function hexToString(hexStr) {
  let hexes = hexStr.match(/.{1,4}/g) || [];
  let back = '';

  for (let j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

export function cycledCharCodeAt(str, index) {
  return str.charCodeAt(index % str.length);
}
