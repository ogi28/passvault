function saveNewPass() {
    const accountName = getValue('account');
    const username = getValue('username');
    const password = getValue('password');

    const accounts = getAccounts();

    accounts.push(
        {
            accountName: accountName,
            username,
            password
        }
    );

    setAccounts(accounts);
}

function getValue(inputName) {
    const input = document.querySelector(`input[name='${inputName}']`);
    return input.value;
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

function setAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts))
}


