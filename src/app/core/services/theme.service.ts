import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal<boolean>(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Inicializar el tema desde localStorage o preferencias del sistema
      this.initializeTheme();
    }

    // Efecto que se ejecuta cuando cambia isDarkMode
    effect(() => {
      if (this.isBrowser) {
        this.applyTheme(this.isDarkMode());
      }
    });
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      this.isDarkMode.set(storedTheme === 'dark');
    } else {
      // Verificar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
  }
}
