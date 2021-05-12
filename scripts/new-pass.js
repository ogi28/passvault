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

    // alert('Added Successfully');

    /*    document.querySelectorAll(`input[name='account'],
        input[name='username'],
        input[name='password']`).value() =''; */

    setAccounts(accounts);

    document.forms['input'].reset();
}

function getValue(inputType) {
    const input = document.querySelector(`input[name='${inputType}']`);
    //debugger;
    // input.required = true;
    return input.value;
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accountStorage')) || [];
}

function setAccounts(accounts) {
    localStorage.setItem('accountStorage', JSON.stringify(accounts))
}

function deleteAccounts(accounts){
    localStorage.removeItem('accountStorage', JSON);
}

