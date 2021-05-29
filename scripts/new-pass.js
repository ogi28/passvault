function getID() {
    const param = new URLSearchParams(location.search);

    return param.get('ID');
}

function saveNewPass(e) {
    e.preventDefault();
    const accountName = getValue('account');
    const username = getValue('username');
    const password = getValue('password');

    AccountsAPI.add({
        account: accountName,
        username: username,
        password: EncryptionAPI.encrypt(password, EncryptionAPI.getSecret()),
    });

    document.forms['input'].reset();

    alert('New password has been successfully added!');
}

function getValue(inputType) {
    const input = document.querySelector(`input[name='${inputType}']`);

    return input.value;
}


function setValue(inputName, values) {
    const input = document.querySelector(`input[name='${inputName}']`);
    input.value = values;
}

function togglePassword() {
    const passInput = document.querySelector(`input[name='password']`)
    const button = document.querySelector('.show-btn');

    const isPassShown = () => passInput.type === 'text';

    passInput.type = isPassShown() ? 'password' : 'text';
    button.innerHTML = isPassShown() ? '&#128064;' : '&#128065;';
}

