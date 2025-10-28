import { Injectable } from '@angular/core';
import { ResinCalcParams, ResinCalcResult } from '../models/resin-calculator.model';

@Injectable({ providedIn: 'root' })
export class ResinCalculatorService {

  readonly defaultVariables = [
    { name: 'Resina (S/ por litro)', value: 80 },
    { name: 'Electricidad (kWh)', value: 0.9 },
    { name: 'Consumo impresora (kWh/h)', value: 0.2 },
    { name: 'Pantalla LCD (S/)', value: 600 },
    { name: 'Film FEP (S/)', value: 40 },
    { name: 'Vida útil LCD (h)', value: 1500 },
    { name: 'Vida útil Film (horas)', value: 200 },
    { name: 'Margen de error (%)', value: 20 },
    { name: 'Multiplicador de beneficio', value: 2 },
    { name: 'Multiplicador postprocesado', value: 2 },
  ];

  calculatePrice(params: ResinCalcParams): ResinCalcResult {
    const {
      resinUsed,
      timePrinting,
      resinPricePerLiter,
      electricityPriceKwh,
      printerConsumptionKwh,
      lcdPrice,
      fepFilmPrice,
      lcdLifeHours,
      fepFilmLifeHours,
      errorMarginPercent,
      profitMultiplier,
      postProcessMultiplier,
    } = params;

    const resinCost = (resinUsed / 1000) * resinPricePerLiter;
    
    // This is calculated based on the original component's logic, labeled "Pérdida de resina".
    const resinLost = (resinCost * errorMarginPercent) / 100;
    
    const timeInHours = timePrinting / 60;

    const energyCost = printerConsumptionKwh * electricityPriceKwh * timeInHours;
    const lcdCost = lcdLifeHours > 0 ? (lcdPrice / lcdLifeHours) * timeInHours : 0;
    const filmCost = fepFilmLifeHours > 0 ? (fepFilmPrice / fepFilmLifeHours) * timeInHours : 0;

    const totalCost = resinLost + resinCost + energyCost + lcdCost + filmCost;
    
    const finalPrice = totalCost * profitMultiplier;
    const finalPricePainted = finalPrice * postProcessMultiplier;
    
    return {
      resinCost,
      resinLost,
      energyCost,
      lcdCost,
      filmCost,
      totalCost,
      finalPrice,
      finalPricePainted,
    };
  }
}
