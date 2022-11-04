const $tableRows = document.querySelectorAll('tbody > tr');

const increment = (element, button) => {
    element.textContent = `${parseInt(element.textContent) + 1}`;
    button.removeAttribute('disabled');
    
    const $productPrice = document.querySelector('.price');
    const $subTotal = document.querySelector('.sub-total');

    const $parsedValue = parseInt($productPrice.textContent);
    
    const resultMult = $parsedValue * element.textContent;
    $subTotal.textContent = resultMult.toLocaleString('pt-BR', { minimumFractionDigits: 2});
}   
const decrement = (element, button) => {
    if(element.textContent > 1) {
        element.textContent = parseInt(element.textContent) - 1;
                
        const $productPrice = document.querySelector('.price');
        const $subTotal = document.querySelector('.sub-total');

        const $parsedValueProd = parseInt($productPrice.textContent);
        const $parsedValueSub = parseInt($subTotal.textContent);
        
        const resultSub = $parsedValueSub - $parsedValueProd;
        $subTotal.textContent = resultSub.toLocaleString('pt-BR', { minimumFractionDigits: 2});
        console.log($subTotal.textContent)
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