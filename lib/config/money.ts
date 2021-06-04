export const formatMoney = (price: number): string => {

    let formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });

    return formatter.format(price / 100);
}