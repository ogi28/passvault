const {contextBridge, clipboard} = require('electron');
const {dbExecution} = require('./scripts/lib/MySQL'); 
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
            
            connection.query(sql, function (err) { //fields not used?
                if (err) {
                    throw err;
                }
            })
        })
    },
    deletePassword: (idDel) => {
        return new Promise((resolve, reject) =>{
            dbExecution(connection => {
                const sql = `DELETE FROM \`accounts\` WHERE id = ${idDel}`

                connection.query(sql, function (err) { 
                    if (err) {
                        reject(err);
                    }
                    else resolve();
                })
            })
        })
    },
    getAllAccounts: () => {
        return new Promise((resolve, reject) => {
            dbExecution(connection => {
                const sql = `SELECT * FROM \`accounts\``;
                connection.query(sql, (err, rows) =>{
                    if (!err){
                        resolve(rows)
                    }
                    else{
                        reject(err);
                    }
                })
            })
        })
    }
})


