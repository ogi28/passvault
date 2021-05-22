const { conn } = require('./MySQL');

function getProperties(obj) {
    return Object.keys(obj);
}

function getValues(obj) {
    return Object.values(obj);
}
function convertString(val) {
    if (typeof val == null) {
        throw new Error("Value can't be null or undefined");
    }
    if (typeof val === 'string') {
        return `'${val}'`;
    } else if (typeof val === 'number') return val;
}

const Db = {
    // CRUD
    // Create, Read, Update, Delete
    createCRUDAPI: (tableName) => {
        return {
            create: (payload) => {
                //INSERT INTO tableName (`column1`, `column2`) VALUES (`string1`, 24 )
                return new Promise((resolve, reject) => {
                    const properties = getProperties(payload);
                    const propertiesStr = `${properties.map((t) => `\`${t}\``).join(', ')}`;
                    const values = getValues(payload);
                    const sql = `INSERT INTO ${tableName} (${propertiesStr}) VALUES(${values
                        .map(convertString)
                        .join(', ')})`;

                    conn.query(sql, (err, results) => {
                        if (!err) resolve(results);
                        else reject(err);
                    });
                });
            },
            get: (whereCondition) => {
                return new Promise((resolve, reject) => {
                    let sql = `SELECT * FROM ${tableName}`;
                    if (whereCondition) {
                        sql +=
                            ' WHERE ' +
                            getProperties(whereCondition)
                                .map((prop) => `${prop}=${whereCondition[prop]}`)
                                .join(' AND '); // join ignores if the array only has 1 element
                    }
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
};

module.exports = Db;
