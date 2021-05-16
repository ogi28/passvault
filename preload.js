const {contextBridge, clipboard} = require('electron');
const {dbExecution /*, conn*/ } = require('./scripts/lib/MySQL'); 
//const {a:{h}} = require
console.log(dbExecution)
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)

        element && (element.innerText = text) // executes rightside if left is correct regardless, simpler if condition
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
        dbExecution(connection => {
            const sql = `INSERT INTO \`accounts\` (\`account\`, \`username\`, \`password\`) VALUES ('${account.accountName}', '${account.username}', '${account.password}');`;
            
            connection.query(sql, function (err, res) { //fields not used?
                if (err) {
                    throw err;
                }

                console.log(res);
            })
        })
    },
    deletePassword: (idDel) => {
        dbExecution(connection => {
            const sql = `DELETE FROM \`accounts\` WHERE id = ${idDel}`

            connection.query(sql, function (err, res) { 
                if (err) {
                    throw err;
                }

                console.log(res);
            })

        })
    },
    getAllAccounts: () => {
        dbExecution(connection => {
            const qry = 'SELECT * FROM accounts';
            connection.query(qry, (err,rows) => {
                if (err) throw err;

                console.log(rows);
            });
        });
    }
})

