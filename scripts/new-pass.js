function saveNewPass(e) {
    e.preventDefault();
    const accountName = getValue('account');
    const username = getValue('username');
    const password = getValue('password');

    db.addNewAccount({
        accountName,
        username,
        password,
    });

    document.forms['input'].reset();

    alert('New password has been successfully added!');
}

function getValue(inputType) {
    const input = document.querySelector(`input[name='${inputType}']`);

    return input.value;
}
