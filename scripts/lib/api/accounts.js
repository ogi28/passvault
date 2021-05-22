const {createCRUDAPI} = require ('../db');
const accountsCRUDAPI = createCRUDAPI('accounts');

async function get(id) {
    const result = await accountsCRUDAPI.get({ id: id });
    return result[0] || null;
}

function getAll() {
    return accountsCRUDAPI.get();
}

function add(account) {
    return accountsCRUDAPI.create(account);
}

function update(id, account) {
    return accountsCRUDAPI.update(account, { id: id });
}
function deleteAcc(id){
    return accountsCRUDAPI.delete(id)
}

module.exports = {
    get,
    getAll,
    add,
    update,
    deleteAcc
}
