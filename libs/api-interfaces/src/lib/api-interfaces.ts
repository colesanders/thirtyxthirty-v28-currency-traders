export interface CurrencyTrader {
  id: string,
  name: string,
  holdings: Holding[]
}

export interface Holding {
  currency: Currency,
  amount: number
}


export interface Currency {
  id: string,
  code: string,

  description?: string,

  symbol?: string,
  rate?: number|string,
  rate_float?: number,
  rates?: {}
}

export interface BPIApiObj {
  time: {},
  disclaimer: string,
  chartName: string,
  bpi: BPI,
}

export interface ConversionApiObj {
  rates: {
    any: number
  },
  base: string,
  date: string,
}

export interface BPI {
  USD?: Currency,
  GBP?: Currency,
  EUR?: Currency,
}

export interface Login {
  id: string,
  username: string,
  password: string
}
