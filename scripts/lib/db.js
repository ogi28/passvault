const {contextBridge} = require('electron');
const {conn} = require('./MySQL');

function getProperties(obj) {
    // TODO: implement
}

function getValues(obj) {
    // TODO: implement
}

contextBridge.exposeInMainWorld('Db', {
    // CRUD
    // Create, Read, Update, Delete
    createCRUDAPI: (tableName) => {
        return {
            create: (payload) => {
                return new Promise((resolve, reject) => {
                    const properties = getProperties(payload);
                    const propertiesStr = `(${properties.map(t => `\`${t}\``).join(',')})`
                    const values = getValues(payload);
                    const sql = `INSERT INTO ${tableName} ${propertiesStr} VALUES(${values.join(',')})`

                    conn.query(sql, (err, results) => {
                        if (!err) {
                            resolve(results);
                        } else {
                            reject(err);
                        }
                    })
                });
            },
            get: (whereCondition) => {
                // TODO: implement
            },
            update: (payload, whereCondition) => {
                // TODO: implement
            },
            delete: (whereCondition) => {
                // TODO: implement
            }
        }
    }
})
