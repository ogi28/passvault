let rowCount = 0;
let accounts = [];

/**
 * Creates a row in the table
 *
 * @param {{accountName: string, username: string, password: string}} account
 * @returns {string}
 */
const createRow = account => {
    const pwd = account.password;

    return `
    <tr id="row_${++rowCount}">
        <td>${rowCount}</td>
        <td>${account.accountName}</td>
        <td>${account.username}</td>
        <td class="pass">${'*'.repeat(7)}</td>
        <td class="actions">
            <button class="show-btn" data-id="${rowCount}" data-pass="${pwd}">Show</button>
            <button class="copy-btn" data-pass="${pwd}">Copy</button>
            <button class="delete-btn" data-id="${rowCount}">Delete</button>
        </td>
    </tr>
    `
}

const getShowButtons = () => document.querySelectorAll('.actions button.show-btn');
const getCopyButtons = () => document.querySelectorAll('.actions button.copy-btn');
const getDeleteButtons = () => document.querySelectorAll('.actions button.delete-btn');

/*
function createRow(account) {
    return `...`
}
 */

function handleShowButton(e) {
    /**
     * @type {HTMLElement}
     */
    const element = e.target;
    const tdPass = document.querySelector(`#row_${element.dataset.id} td.pass`);
    const isPassShown = () => element.classList.contains('shown');

    tdPass.textContent = isPassShown()
        ? '*'.repeat(7)
        : element.dataset.pass;

    element.classList.toggle('shown');
    element.textContent = isPassShown() ? 'Hide' : 'Show';
}

function handleCopyButton(e) {
    Util.copyToClipboard(e.target.dataset.pass);
}

function handleDeleteButton(e) {
    const {id} = e.target.dataset;
    const index = id - 1;

    accounts.splice(index, 1);

    renderRows(accounts);
    setAccounts(accounts);
}

function initiateActionButtonsEventListeners() {
    getShowButtons().forEach(btn => {
        btn.addEventListener('click', handleShowButton);
    });

    getCopyButtons().forEach(btn => {
        btn.addEventListener('click', handleCopyButton);
    });

    getDeleteButtons().forEach(btn => {
        btn.addEventListener('click', handleDeleteButton);
    });
}

function resetList() {
    rowCount = 0;

    getShowButtons().forEach(btn => btn.removeEventListener('click', handleShowButton));
    getCopyButtons().forEach(btn => btn.removeEventListener('click', handleCopyButton));
    getDeleteButtons().forEach(btn => btn.removeEventListener('click', handleDeleteButton));
}

function renderRows(accounts) {
    resetList();

    const tbody = document.querySelector('table tbody');

    tbody.innerHTML = accounts.map(account => createRow(account)).join('');

    initiateActionButtonsEventListeners();
}

window.onload = () => {
    accounts = getAccounts();

    renderRows(accounts);
}
