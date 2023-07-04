export const formatCurrency = (price: number): string => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return USDollar.format(price)
}
