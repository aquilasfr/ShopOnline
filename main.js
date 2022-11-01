const $tableRows = document.querySelectorAll('tbody > tr');

const increment = (element, button) => {
    element.textContent = `${parseInt(element.textContent) + 1}`;
    button.removeAttribute('disabled');
}

const decrement = (element, button) => {
    if(element.textContent > 1) {
        element.textContent = `${parseInt(element.textContent) - 1}`;
    }else {
        button.setAttribute('disabled', '');
    }
}

for (let i = 0; i < $tableRows.length; i++) {
    const $incrementButton = $tableRows[i].querySelector('.btn-increment');
    const $decrementButton = $tableRows[i].querySelector('.btn-decrement');
    const $amount = $tableRows[i].querySelector('.the-amount');
    
    $incrementButton.addEventListener('click', () => increment($amount, $decrementButton));
    $decrementButton.addEventListener('click', () => decrement($amount, $decrementButton));
}