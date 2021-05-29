let rowCount = 0;
let accounts = [];

/**
 * Creates a row in the table
 *
 * @param {{accountName: string, username: string, password: string}} account
 * @returns {string}
 */
const createRow = (account) => {
    const pwd = account.password;

    return `
    <tr id="row_${account.id}">
        <td>${++rowCount}</td>
        <td>${account.account}</td>
        <td>${account.username}</td>
        <td class="pass">${'*'.repeat(7)}</td>
        <td class="actions">
            <button class="show-btn btn btn-primary" data-id="${account.id}" data-pass="${pwd}">&#128065;</button>
            <button class="copy-btn btn btn-primary" data-pass="${pwd}">Copy</button>
            <a href="./update.html?ID=${account.id}" class="btn btn-primary">Update</a>
            <button class="delete-btn btn btn-danger" data-id="${account.id}">Delete</button>
        </td>
    </tr>
    `;
};
const getShowButtons = () => document.querySelectorAll('.actions button.show-btn');
const getCopyButtons = () => document.querySelectorAll('.actions button.copy-btn');
const getDeleteButtons = () => document.querySelectorAll('.actions button.delete-btn');

function handleShowButton(e) {
    /**
     * @type {HTMLElement}
     */
    const element = e.target;
    const tdPass = document.querySelector(`#row_${element.dataset.id} td.pass`);
    const isPassShown = () => element.classList.contains('shown');

    tdPass.textContent = isPassShown() ? '*'.repeat(7) : EncryptionAPI.decrypt(element.dataset.pass, EncryptionAPI.getSecret());

    element.classList.toggle('shown');
    element.innerHTML = isPassShown() ? '&#128064;' : '&#128065;';
}

function handleCopyButton(e) {
    Util.copyToClipboard(e.target.dataset.pass);
}

async function handleDeleteButton(e) {
    if (!confirm('Are you sure?')) {
        return;
    }
    //const {id: ix} = e.target.dataset; destructing
    const { id } = e.target.dataset;

    await AccountsAPI.deleteAcc(id);

    renderRows(await AccountsAPI.getAll());
}

function initiateActionButtonsEventListeners() {
    getShowButtons().forEach((btn) => {
        btn.addEventListener('click', handleShowButton);
    });

    getCopyButtons().forEach((btn) => {
        btn.addEventListener('click', handleCopyButton);
    });

    getDeleteButtons().forEach((btn) => {
        btn.addEventListener('click', handleDeleteButton);
    });
}

function resetList() {
    rowCount = 0;

    getShowButtons().forEach((btn) => btn.removeEventListener('click', handleShowButton));
    getCopyButtons().forEach((btn) => btn.removeEventListener('click', handleCopyButton));
    getDeleteButtons().forEach((btn) => btn.removeEventListener('click', handleDeleteButton));
}

function renderRows(accounts) {
    resetList();

    const tbody = document.querySelector('table tbody');

    tbody.innerHTML = accounts.map((account) => createRow(account)).join('');

    initiateActionButtonsEventListeners();
}

window.onload = async () => {
    try {
        accounts = await AccountsAPI.getAll();
        renderRows(accounts);
    } catch (err) {
        console.error(err);
    }
};
