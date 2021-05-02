let rowCount = 0;

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
        </td>
    </tr>
    `
}

/*
function createRow(account) {
    return `...`
}
 */

window.onload = () => {
    const accounts = getAccounts();
    const rows = accounts.map(account => createRow(account)).join('');
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = rows;

    document.querySelectorAll('.actions button.show-btn').forEach(btn => {
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

function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
