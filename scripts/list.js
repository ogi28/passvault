let rowCount = 0;

/**
 * Creates a row in the table
 *
 * @param {{accountName: string, username: string, password: string}} account
 * @returns {string}
 */
const createRow = (account) => `
<tr id="row_${++rowCount}">
    <td>${rowCount}</td>
    <td>${account.accountName}</td>
    <td>${account.username}</td>
    <td class="pass">${'*'.repeat(7)}</td>
    <td class="show-btn" data-id="${rowCount}" data-pass="${account.password}">Show</td>
</tr>
`;

window.onload = () => {
    const accounts = getAccounts();
    const rows = accounts.map(account => createRow(account)).join('');
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = rows;

    document.querySelectorAll('.show-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
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
        });
    })
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}
