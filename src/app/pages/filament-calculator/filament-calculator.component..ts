import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilamentCalculatorService } from '../../core/services/filament-calculator.service';
import {
  FilamentCalcParams,
  FilamentCalcResult,
  FilamentMaterial,
} from '../../core/models/filament-calculator.model';

@Component({
  selector: 'app-filament-calculator',
  templateUrl: './filament-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, CommonModule, FormsModule],
})
export class FilamentCalculatorComponent {
  private filamentService = inject(FilamentCalculatorService);

  // Input Signals
  materials = this.filamentService.materials;
  selectedMaterial = signal<FilamentMaterial>((this.materials as FilamentMaterial[])[0]);
  grams = signal(100);
  hours = signal(5);

  priceKwh = signal(0.9);
  consumptionWatts = signal(250);
  lifeHours = signal(2000);
  replacements = signal(500);

  errorPercent = signal(15);
  profitMultiplier = signal(2.5);

  // Result Signal
  results = signal<FilamentCalcResult | null>(null);

  // Handle material selection change
  onMaterialChange(event: Event): void {
    const selectedName = (event.target as HTMLSelectElement).value;
    const material = (this.materials as FilamentMaterial[]).find(
      (m: FilamentMaterial) => m.name === selectedName
    );
    if (material) {
      this.selectedMaterial.set(material);
    }
  }

  calculate(): void {
    const params: FilamentCalcParams = {
      material: this.selectedMaterial(),
      grams: this.grams(),
      hours: this.hours(),
      priceKwh: this.priceKwh(),
      consumptionWatts: this.consumptionWatts(),
      lifeHours: this.lifeHours(),
      replacements: this.replacements(),
      errorPercent: this.errorPercent(),
      profitMultiplier: this.profitMultiplier(),
    };
    this.results.set((this.filamentService as any).calculatePrice(params));
  }
}
