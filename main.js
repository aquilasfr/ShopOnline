const $tableRows = document.querySelectorAll('tbody > tr');

const getTotal = () => {
    const $totalBuy = document.querySelector('.total');
    const $subTotal = document.querySelectorAll('.sub-total');
    let total = 0;

    $subTotal.forEach((el) => {
        total += parseInt(el.textContent);
    })

    $totalBuy.textContent = total.toLocaleString('pt-BR', { minimumFractionDigits: 2});;
}
getTotal();

const calcSubTotal = (tableRow, $amount) => {
    const $productPrice = tableRow.querySelector('.price');
    const $subTotal = tableRow.querySelector('.sub-total');
    const parsedValue = parseInt($productPrice.textContent);
    const subTotal = parsedValue * $amount.textContent;
    
    $subTotal.textContent = subTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2});

    getTotal();
}


const increment = ($amount, button, tableRow) => {
    $amount.textContent = `${parseInt($amount.textContent) + 1}`;
    button.removeAttribute('disabled');

    calcSubTotal(tableRow, $amount, 'increment')        
}   
const decrement = ($amount, button, tableRow) => {
     const value = parseInt($amount.textContent) - 1;
     $amount.textContent = value;
     calcSubTotal(tableRow, $amount, 'decrement');

    if(value <= 1) { 
        button.setAttribute('disabled', '');
    }
}

$tableRows.forEach((tableRow) => {
    const $incrementButton = tableRow.querySelector('.btn-increment');
    const $decrementButton = tableRow.querySelector('.btn-decrement');
    const $amount = tableRow.querySelector('.the-amount');  

    $incrementButton.addEventListener('click', () => increment($amount, $decrementButton, tableRow));
    $decrementButton.addEventListener('click', () => decrement($amount, $decrementButton, tableRow));
});

fetch('http://localhost:3000/')
    .then(res => console.log(res))
    