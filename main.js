import {
  fetchCheckoutById
} from './services.js';

import {
  currencyToFloat,
  numberToCurrency
} from './formatters.js';

const getTotal = () => {
  const $totalBuy = document.querySelector('.total');
  const $subTotal = document.querySelectorAll('.sub-total');
  const total = Array.from($subTotal).reduce((acc, el) => acc + currencyToFloat(el.textContent), 0);

  $totalBuy.textContent = numberToCurrency(total);
}

const calcSubTotal = (tableRow, $amount) => {
  const $productPrice = tableRow.querySelector('.price');
  const $subTotal = tableRow.querySelector('.sub-total');
  const parsedValue = parseInt($productPrice.textContent);
  const subTotal = parsedValue * $amount.textContent;

  $subTotal.textContent = numberToCurrency(subTotal);

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

  if (value === 1) {
    button.setAttribute('disabled', '');
  }
}

const fetchCheckoutData = async () => {
  const data = await fetchCheckoutById(4);

  const $tBody = document.querySelector('.tbody')

  $tBody.innerHTML = data.map((item) => `
      <tr>
        <td>${item.title}</td>
        <td>
          <span>R$</span>
          <span class="price">${numberToCurrency(item.price)}</span>
        </td>
        <td>
          <button ${item.count <= 1 ? 'disabled' : ''} class="border border-secondary rounded btn-decrement">
            -
          </button>
        <span class="the-amount">${item.count}</span>
        <button class="border border-secondary rounded btn-increment">
            +
          </button>
        </td>
        <td>
          <span>R$</span>
          <span class="sub-total">${numberToCurrency(item.price)}</span>
        </td>
      </tr>
    `).join("");
}

const addCounterOnTableRows = () => {
  const $tableRows = document.querySelectorAll('tbody > tr');

  $tableRows.forEach((tableRow) => {
    const $incrementButton = tableRow.querySelector('.btn-increment');
    const $decrementButton = tableRow.querySelector('.btn-decrement');
    const $amount = tableRow.querySelector('.the-amount');

    $incrementButton.addEventListener('click', () => increment($amount, $decrementButton, tableRow));
    $decrementButton.addEventListener('click', () => decrement($amount, $decrementButton, tableRow));
  });
}

const init = async () => {
  await fetchCheckoutData();
  addCounterOnTableRows();
  getTotal();
}

init();