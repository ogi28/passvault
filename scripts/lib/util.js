const {contextBridge, clipboard} = require('electron');

contextBridge.exposeInMainWorld('Util', {
    copyToClipboard: (text) => clipboard.write({text})
});
