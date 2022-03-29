const formatMoney = (price) => {
    return new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", currencyDisplay: 'narrowSymbol'}).format(price);
}

export { formatMoney }