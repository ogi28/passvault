const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('EncryptionAPI', require('./encryption'));


