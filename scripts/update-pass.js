function getID() {
    const param = new URLSearchParams(location.search);

    return param.get('ID');
}

function updatePass(e) {
    e.preventDefault();
    const id = getID();
    const accountName = getValue('account');
    const username = getValue('username');
    const password = getValue('password');

    AccountsAPI.update(id, {
        account: accountName,
        username: username,
        password: password,
    });

    document.forms['input'].reset();

    alert('Password Updated!');
}

function getValue(inputName) {
    const input = document.querySelector(`input[name='${inputName}']`);

    return input.value;
}
function setValue(inputName, values) {
    const input = document.querySelector(`input[name='${inputName}']`);
 // if (inputName == 'password') input.value = EncryptionAPI.decrypt(values, getSecret());
    /*else*/ input.value = values;
}

//TODO show decrypted password, getSecret undefined?
function togglePassword() {
    const passInput = document.querySelector(`input[name='password']`);
    const button = document.querySelector('.show-btn');

    const isPassShown = () => passInput.type === 'text';

    passInput.type = isPassShown() ? 'password' : 'text';
    button.innerHTML = isPassShown() ? '&#128064;' : '&#128065;';
}

function generatePassword() {
    var length = 30;
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}<>?/';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    let joined = result.join('');
    document.getElementById('passGen').value = joined;
}

window.onload = async () => {
    const accountObj = await AccountsAPI.get(getID());
    setValue('account', accountObj.account);
    setValue('username', accountObj.username);
    setValue('password', accountObj.password);
};
