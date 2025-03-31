export const formatCurrency = (amount: number): string => {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
      currencyDisplay: 'narrowSymbol',
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  
    return formattedCurrency;
  };