const $tableRows = document.querySelectorAll('tbody > tr');

const increment = (element, button, tableRow) => {
    element.textContent = `${parseInt(element.textContent) + 1}`;
    button.removeAttribute('disabled');
    
    const $productPrice = tableRow.querySelector('.price');
    const $subTotal = tableRow.querySelector('.sub-total');
    const $totalBuy = document.querySelector('.total');
    
    const parsedValue = parseInt($productPrice.textContent);
    
    const resultMult = parsedValue * element.textContent;
    
    $subTotal.textContent = resultMult.toLocaleString('pt-BR', { minimumFractionDigits: 2});
    $totalBuy.textContent = resultMult.toLocaleString('pt-BR', { minimumFractionDigits: 2});
}   
const decrement = (element, button, tableRow) => {
    if(element.textContent > 1) {
        element.textContent = parseInt(element.textContent) - 1;
                
        const $productPrice = tableRow.querySelector('.price');
        const $subTotal = tableRow.querySelector('.sub-total');
        const $totalBuy = document.querySelector('.total');

        const parsedValue = parseInt($productPrice.textContent);
        const parsedValueSubtotal = parseInt($subTotal.textContent);
        
        const resultSub = parsedValueSubtotal - parsedValue;
        
        $subTotal.textContent = resultSub.toLocaleString('pt-BR', { minimumFractionDigits: 2});
        $totalBuy.textContent = resultSub.toLocaleString('pt-BR', { minimumFractionDigits: 2});
    }else {
        button.setAttribute('disabled', '');
    }
}

$tableRows.forEach((tableRow) => {
    const $incrementButton = tableRow.querySelector('.btn-increment');
    const $decrementButton = tableRow.querySelector('.btn-decrement');
    const $amount = tableRow.querySelector('.the-amount');  

    $incrementButton.addEventListener('click', () => increment($amount, $incrementButton, tableRow));
    $decrementButton.addEventListener('click', () => decrement($amount, $decrementButton, tableRow));
});