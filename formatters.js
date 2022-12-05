export const currencyToFloat = (value) => {
    if (typeof value === 'string') {
        return Number(value.replace(/\./g, '').replace(/,/g, '.'));
    }

    return 0;
}

export const numberToCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2
    });
}