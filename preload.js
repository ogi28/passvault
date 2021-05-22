//const {a:{h}} = require

require('./scripts/lib/db');
require('./scripts/lib/db-deprecated');
require('./scripts/lib/util');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);

        element && (element.innerText = text); // executes rightside if left is correct regardless, simpler if condition
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});
