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
        password: password,
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

window.onload = async () => {
    const accountObj = await AccountsAPI.get(getID());
    setValue('account', accountObj.account);
    setValue('username', accountObj.username);
    setValue('password', accountObj.password);
};
