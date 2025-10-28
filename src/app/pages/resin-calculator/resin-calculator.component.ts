import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResinCalculatorService } from '../../core/services/resin-calculator.service';
import { ResinCalcResult } from '../../core/models/resin-calculator.model';

@Component({
  selector: 'app-resin-calculator',
  templateUrl: './resin-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, CommonModule, FormsModule, RouterLink],
})
export class ResinCalculatorComponent {
  private resinService = inject(ResinCalculatorService);

  // Results Signal
  results = signal<ResinCalcResult | null>(null);

  // Input Signals
  resinUsed = signal(0);
  timePrinting = signal(0);

  // Initialize variables from service defaults, wrapping values in signals for UI binding
  printerVariables = signal(
    this.resinService.defaultVariables.map((v: any) => ({
      name: v.name,
      value: signal(v.value),
    }))
  );

  calculatePrice() {
    const vars = this.printerVariables();
    const params = {
      resinUsed: this.resinUsed(),
      timePrinting: this.timePrinting(),
      resinPricePerLiter: vars[0].value(),
      electricityPriceKwh: vars[1].value(),
      printerConsumptionKwh: vars[2].value(),
      lcdPrice: vars[3].value(),
      fepFilmPrice: vars[4].value(),
      lcdLifeHours: vars[5].value(),
      fepFilmLifeHours: vars[6].value(),
      errorMarginPercent: vars[7].value(),
      profitMultiplier: vars[8].value(),
      postProcessMultiplier: vars[9].value(),
    };

    this.results.set((this.resinService as any).calculatePrice(params));
  }
}
