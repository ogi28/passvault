const {contextBridge} = require('electron');

contextBridge.exposeInMainWorld('AccountsAPI', require('./accounts'));
