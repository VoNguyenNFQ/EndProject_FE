const formatMoney = (price) => {
    return new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", currencyDisplay: 'narrowSymbol'}).format(price);
}

const formatYMD = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

export { formatMoney, formatYMD }