const { contextBridge } = require('electron');
const { dbExecution } = require('./MySQL');

console.log(dbExecution);

contextBridge.exposeInMainWorld('db', {
    addNewAccount: (account) => {
        dbExecution((connection) => {
            const sql = `INSERT INTO \`accounts\` (\`account\`, \`username\`, \`password\`) VALUES ('${account.accountName}', '${account.username}', '${account.password}');`;

            connection.query(sql, function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    },
    deletePassword: (idDel) => {
        return new Promise((resolve, reject) => {
            dbExecution((connection) => {
                const sql = `DELETE FROM \`accounts\` WHERE id = ${idDel}`;

                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    } else resolve();
                });
            });
        });
    },
    getAllAccounts: () => {
        return new Promise((resolve, reject) => {
            dbExecution((connection) => {
                const sql = `SELECT * FROM \`accounts\``;
                connection.query(sql, (err, rows) => {
                    if (!err) {
                        resolve(rows);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    },
});
