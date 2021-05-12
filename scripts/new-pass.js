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
            accountName,
            username, /*: username*/
            password
        }
    );

    setAccounts(accounts);

    document.forms['input'].reset();
}

function getValue(inputType) {
    const input = document.querySelector(`input[name='${inputType}']`);

    return input.value;
}
