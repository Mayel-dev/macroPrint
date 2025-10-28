export interface ResinCalcParams {
  resinUsed: number; // grams
  timePrinting: number; // minutes
  resinPricePerLiter: number;
  electricityPriceKwh: number;
  printerConsumptionKwh: number;
  lcdPrice: number;
  fepFilmPrice: number;
  lcdLifeHours: number;
  fepFilmLifeHours: number;
  errorMarginPercent: number;
  profitMultiplier: number;
  postProcessMultiplier: number;
}

export interface ResinCalcResult {
  resinCost: number;
  resinLost: number;
  energyCost: number;
  lcdCost: number;
  filmCost: number;
  totalCost: number;
  finalPrice: number;
  finalPricePainted: number;
}
