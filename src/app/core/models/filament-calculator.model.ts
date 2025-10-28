export interface FilamentMaterial {
  name: string;
  pricePerGram: number; // Price in S/ per gram
}

export interface FilamentCalcParams {
  material: FilamentMaterial;
  grams: number;
  hours: number;
  priceKwh: number;
  consumptionWatts: number;
  lifeHours: number;
  replacements: number;
  errorPercent: number;
  profitMultiplier: number;
}

export interface FilamentCalcResult {
  materialCost: number;
  energyCost: number;
  machineWearCost: number;
  errorMargin: number;
  totalCost: number;
  finalPrice: number;
}
