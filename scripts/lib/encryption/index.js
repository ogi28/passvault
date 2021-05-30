const { contextBridge } = require('electron');
const encryption = require('./encryption');

contextBridge.exposeInMainWorld('EncryptionAPI', encryption);

encryption.shouldCreateSecretKey();
