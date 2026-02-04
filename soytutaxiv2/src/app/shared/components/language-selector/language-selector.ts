import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation';

/**
 * 🌐 LanguageSelectorComponent
 * 
 * Selector de idiomas con dropdown.
 * Muestra el idioma actual y permite cambiar entre los 7 idiomas soportados.
 * 
 * Características:
 * - Dropdown con 7 idiomas
 * - Banderas emoji
 * - Integración con TranslationService
 * - Estado reactivo (Angular Signals)
 * - Animación de apertura/cierre
 * - Click outside para cerrar
 * 
 * @example
 * <app-language-selector />
 */
@Component({
  selector: 'app-language-selector',
  imports: [CommonModule],
  templateUrl: './language-selector.html'
})
export class LanguageSelectorComponent {
  private translationService = inject(TranslationService);

  /**
   * Estado del dropdown (abierto/cerrado)
   */
  protected isOpen = false;

  /**
   * Lista de idiomas disponibles
   */
  protected readonly languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  /**
   * Obtiene el código del idioma actual
   */
  get currentLanguageCode(): string {
    return this.translationService.getCurrentLanguage();
  }

  /**
   * Obtiene el objeto del idioma actual
   */
  get currentLanguageData() {
    const code = this.currentLanguageCode;
    return this.languages.find(lang => lang.code === code) || this.languages[0];
  }

  /**
   * Toggle dropdown
   */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Cerrar dropdown
   */
  closeDropdown(): void {
    this.isOpen = false;
  }

  /**
   * Cambiar idioma
   */
  changeLanguage(code: string): void {
    this.translationService.setLanguage(code);
    this.closeDropdown();
  }

  /**
   * Verificar si es el idioma actual
   */
  isCurrentLanguage(code: string): boolean {
    return this.currentLanguageCode === code;
  }
}
