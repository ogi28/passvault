function saveNewPass(e) {
    e.preventDefault();
    const accountName = getValue('account');
    const username = getValue('username');
    const password = getValue('password');

    const accounts = getAccounts();

    /*
    If the key and value are same, we can just use key.
     */
    accounts.push(
        {
            accountName: accountName,
            username,
            password
        }
    );

    setAccounts(accounts);
}

function getValue(inputType) {
    const input = document.querySelector(`input[name='${inputType}']`);
    //debugger;
   // input.required = true;
    return input.value;
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

function setAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts))
}


