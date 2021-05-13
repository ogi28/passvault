const {contextBridge, clipboard} = require('electron');
const conn = require('./scripts/lib/MySQL');


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }


})

contextBridge.exposeInMainWorld('Util', {
    copyToClipboard: (text) => clipboard.write({text})

});

contextBridge.exposeInMainWorld('db', {
    addNewAccount: (account) => {
        conn.connect();

        var sql = `INSERT INTO \`accounts\` (\`account\`, \`username\`, \`password\`) VALUES ('${account.accountName}', '${account.username}', '${account.password}');`;

        conn.query(sql, function (err, res, fields) { //fields not used?
            if (err) throw err;
            console.log(res);
        })
        conn.end();


    }

});

