const accountsCRUDAPI = Db.createCRUDAPI('accounts');

function get(id) {
    return accountsCRUDAPI.get({id: id});
}

function getAll() {
    return accountsCRUDAPI.get();
}

function add(account) {
    return accountsCRUDAPI.create(account);
}

function update(id, account) {
    return accountsCRUDAPI.update(account, {id: id});
}
