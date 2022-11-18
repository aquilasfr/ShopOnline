const $tableRows = document.querySelectorAll('tbody > tr');

const getTotal = (tableRow, type) => {
    const $totalBuy = document.querySelector('.total');
    const $subTotal = tableRow.querySelector('.sub-total');
    if(type == 'increment') {
        $totalBuy.textContent = parseInt($subTotal.textContent) + parseInt($totalBuy.textContent);
        console.log($totalBuy)
    }else {
        $totalBuy.textContent = parseInt($totalBuy.textContent) - parseInt($subTotal.textContent);
    }
}

const calcSubTotal = (tableRow, $amount, type) => {
    const $productPrice = tableRow.querySelector('.price');
    const $subTotal = tableRow.querySelector('.sub-total');
    const parsedValue = parseInt($productPrice.textContent);
    const subTotal = parsedValue * $amount.textContent;
    
    $subTotal.textContent = subTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2});

    getTotal(tableRow, type);
}


const increment = ($amount, button, tableRow) => {
    $amount.textContent = `${parseInt($amount.textContent) + 1}`;
    button.removeAttribute('disabled');
    console.log(button)

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
