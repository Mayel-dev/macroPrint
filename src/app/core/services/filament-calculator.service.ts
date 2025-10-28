import { Injectable } from '@angular/core';
import {
  FilamentCalcParams,
  FilamentCalcResult,
  FilamentMaterial,
} from '../models/filament-calculator.model';

@Injectable({ providedIn: 'root' })
export class FilamentCalculatorService {
  readonly materials: FilamentMaterial[] = [
    { name: 'K3D PLA', pricePerGram: 0.055 },
    { name: 'PolyLite PETG', pricePerGram: 0.06 },
    { name: 'PolyLite Silk', pricePerGram: 0.08 },
    { name: 'eSun PLA+', pricePerGram: 0.07 },
    { name: 'eSun RainbowGlow', pricePerGram: 0.095 },
    { name: 'PolyLite ABS', pricePerGram: 0.065 },
    { name: 'eSun PLA Silk', pricePerGram: 0.08 },
    { name: 'HyperPLA', pricePerGram: 0.07 },
  ];

  calculatePrice(params: FilamentCalcParams): FilamentCalcResult {
    const {
      grams,
      material,
      hours,
      consumptionWatts,
      priceKwh,
      replacements,
      lifeHours,
      errorPercent,
      profitMultiplier,
    } = params;

    const materialCost = grams * material.pricePerGram;
    const energyCost = hours * (consumptionWatts / 1000) * priceKwh;
    const machineWearCost = lifeHours > 0 ? (replacements / lifeHours) * hours : 0;

    const subTotal = materialCost + energyCost + machineWearCost;
    const errorMargin = subTotal * (errorPercent / 100);

    const totalCost = subTotal + errorMargin;
    const finalPrice = totalCost * profitMultiplier;

    return {
      materialCost,
      energyCost,
      machineWearCost,
      errorMargin,
      totalCost,
      finalPrice,
    };
  }
}
