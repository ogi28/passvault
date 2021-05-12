function getAccounts() {
    return JSON.parse(localStorage.getItem('accountStorage')) || [];
}

function setAccounts(accounts) {
    localStorage.setItem('accountStorage', JSON.stringify(accounts));
}
