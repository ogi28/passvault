const { contextBridge } = require('electron');
const { conn } = require('./MySQL');

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
                    const propertiesStr = `(${properties.map((t) => `\`${t}\``).join(',')})`; //eee
                    const values = getValues(payload);
                    const sql = `INSERT INTO ${tableName} ${propertiesStr} VALUES(${values.join(',')})`;

                    conn.query(sql, (err, results) => {
                        if (!err) resolve(results);
                        else reject(err);
                    });
                });
            },
            get: (whereCondition) => {
                return new Promise((resolve, reject) => {
                    const sql = `SELECT * FROM ${tableName} WHERE id = ${whereCondition}`;
                    conn.query(sql, (err, results) => {
                        if (!err) resolve(results);
                        else reject(err);
                    });
                });
            },
            //FIXME
            update: (payload, whereCondition) => {
                return new Promise((resolve, reject) => {
                    const properties = getProperties(payload);
                    const propertiesStr = `(${properties.map((t) => `\`${t}\``).join(',')})`; //eee
                    const values = getValues(payload);
                    const sql = `UPDATE ${propertiesStr} FROM ${values} WHERE id = ${whereCondition}`;

                    conn.query(sql, (err, results) => {
                        if (!err) resolve(results);
                        else reject(err);
                    });
                });

            },
            //FIXME
            delete: (whereCondition) => {
                return new Promise((resolve, reject) => {
                    const sql = `DELETE FROM ${tableName} WHERE id = ${whereCondition}`;
                    conn.query(sql, (err, results) => {
                        if (!err) resolve(results);
                        else reject(err);
                    });
                });
            },
        };
    },
});
