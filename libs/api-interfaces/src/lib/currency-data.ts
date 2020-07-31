export enum CurrencyTypes {
    USD = 'USD',
    GBP = 'GBP',
    EUR = 'EUR',
    BC = 'BC',
}

export const CurrencyIcons = {
    [CurrencyTypes.USD]: 'dollar',
    [CurrencyTypes.GBP]: 'pound-sterling',
    [CurrencyTypes.EUR]: 'euro',
    [CurrencyTypes.BC]: 'bitcoin',
}

export const getCurrencyIcon = (curr: string): CurrencyTypes =>
    Object.values(CurrencyTypes).find(currType => {
        
        return curr.toLowerCase().includes(currType);
    })