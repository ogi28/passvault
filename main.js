const { app, BrowserWindow, ipcMain } = require('electron');
const { conn } = require('./scripts/lib/MySQL');

const path = require('path');

ipcMain.on('userDataPath', (event) => {
    event.returnValue = app.getPath('userData');
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadFile('pages/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
        conn.connect();
    });
});

app.on('before-quit', () => {
    conn.end();
    //console.log("Conn ends");
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
