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
        password: EncryptionAPI.encrypt(password, EncryptionAPI.getSecret()),
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
    input.value = values;
}

function togglePassword() {
    const passInput = document.querySelector(`input[name='password']`);
    const button = document.querySelector('.show-btn');

    const isPassShown = () => passInput.type === 'text';

    passInput.type = isPassShown() ? 'password' : 'text';
    button.innerHTML = isPassShown() ? '&#128064;' : '&#128065;';
}

const CharMode = {
    LowerCase: '0x0001',
    UpperCase: '0x0002',
    SpecChar: '0x0004',
    Num: '0x0008',
};

function generatePassword(options = {}) {
    const defaultOptions = {
        length: 30,
        charMode: CharMode.LowerCase | CharMode.UpperCase | CharMode.Num | CharMode.SpecChar,
    };
    options = {
        ...defaultOptions, //... is concat
        ...options,
    };
    var result = [];
    const charactersOptions = [];

    if (options.charMode & CharMode.LowerCase) {
        charactersOptions.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (options.charMode & CharMode.UpperCase) {
        charactersOptions.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (options.charMode & CharMode.SpecChar) {
        charactersOptions.push('!@#$%^&*(){}<>?/');
    }
    if (options.charMode & CharMode.Num) {
        charactersOptions.push('0123456789');
    }

    charactersOptions.forEach((characters) => {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    });

    let characters = charactersOptions.join('');

    for (var i = 0; i < options.length - charactersOptions.length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    let joined = result.join('');

    document.getElementById('passGen').value = joined;
}

window.onload = async () => {
    const accountObj = await AccountsAPI.get(getID());
    setValue('account', accountObj.account);
    setValue('username', accountObj.username);
    setValue('password', EncryptionAPI.decrypt(accountObj.password, EncryptionAPI.getSecret()));
};
