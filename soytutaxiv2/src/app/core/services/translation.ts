import { Injectable, inject, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 🌐 TranslationService
 * 
 * Servicio centralizado para la gestión de traducciones multiidioma.
 * Proporciona funcionalidades avanzadas de i18n con soporte para 7 idiomas.
 * 
 * Características:
 * - 7 idiomas soportados (EN, ES, RU, ZH, PT, DE, FR)
 * - Persistencia en localStorage
 * - Detección automática de idioma del navegador
 * - Signals de Angular para reactividad
 * - Cache de traducciones
 * - Fallback a inglés por defecto
 * 
 * @author SoyTuTaxi Team
 * @version 2.0
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  icon?: string; // PrimeNG icon class
  flag?: string; // Emoji flag
}

export interface TranslationKey {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translate = inject(TranslateService);

  // ==================== CONSTANTS ====================

  /**
   * Idiomas soportados por la aplicación
   */
  public readonly SUPPORTED_LANGUAGES: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      icon: 'pi pi-globe',
      flag: '🇬🇧'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      icon: 'pi pi-globe',
      flag: '🇪🇸'
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      icon: 'pi pi-globe',
      flag: '🇷🇺'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      icon: 'pi pi-globe',
      flag: '🇨🇳'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      icon: 'pi pi-globe',
      flag: '🇵🇹'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      icon: 'pi pi-globe',
      flag: '🇩🇪'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      icon: 'pi pi-globe',
      flag: '🇫🇷'
    }
  ];

  /**
   * Idioma por defecto (fallback)
   */
  public readonly DEFAULT_LANGUAGE = 'en';

  /**
   * Clave para almacenar el idioma en localStorage
   */
  private readonly STORAGE_KEY = 'soytutaxi_language';

  // ==================== STATE ====================

  /**
   * Signal del idioma actual (Angular Signals para reactividad)
   */
  private currentLanguageSignal = signal<string>(this.DEFAULT_LANGUAGE);

  /**
   * Signal computado del objeto de idioma actual
   */
  public currentLanguage = computed(() => {
    const code = this.currentLanguageSignal();
    return this.SUPPORTED_LANGUAGES.find(lang => lang.code === code) ||
      this.SUPPORTED_LANGUAGES[0];
  });

  /**
   * BehaviorSubject para compatibilidad con RxJS
   * (útil para casos donde se necesitan Observables tradicionales)
   */
  private languageChange$ = new BehaviorSubject<string>(this.DEFAULT_LANGUAGE);

  /**
   * Observable público de cambios de idioma
   */
  public onLanguageChange$: Observable<string> = this.languageChange$.asObservable();

  // ==================== INITIALIZATION ====================

  constructor() {
    this.initializeTranslation();
  }

  /**
   * Inicializa el servicio de traducción
   * - Configura idiomas disponibles
   * - Detecta idioma del navegador o carga desde localStorage
   * - Establece idioma por defecto
   */
  private initializeTranslation(): void {
    // Configurar idiomas disponibles
    const languageCodes = this.SUPPORTED_LANGUAGES.map(lang => lang.code);
    this.translate.addLangs(languageCodes);

    // Establecer idioma por defecto
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);

    // Detectar idioma del sistema o cargar guardado
    const savedLanguage = this.getStoredLanguage();
    const browserLanguage = this.detectBrowserLanguage();
    const initialLanguage = savedLanguage || browserLanguage || this.DEFAULT_LANGUAGE;

    // Aplicar idioma inicial
    this.setLanguage(initialLanguage);

    console.log('🌐 TranslationService initialized');
    console.log('📍 Available languages:', languageCodes);
    console.log('✅ Current language:', initialLanguage);
  }

  // ==================== PUBLIC METHODS ====================

  /**
   * Cambia el idioma de la aplicación
   * @param langCode - Código del idioma (ej: 'en', 'es', 'ru')
   * @returns Promise que se resuelve cuando el idioma está cargado
   */
  public async setLanguage(langCode: string): Promise<void> {
    // Validar que el idioma esté soportado
    if (!this.isLanguageSupported(langCode)) {
      console.warn(`⚠️ Language '${langCode}' not supported. Falling back to default.`);
      langCode = this.DEFAULT_LANGUAGE;
    }

    try {
      // Cargar traducciones
      await firstValueFrom(this.translate.use(langCode));

      // Actualizar state
      this.currentLanguageSignal.set(langCode);
      this.languageChange$.next(langCode);

      // Guardar en localStorage
      this.saveLanguage(langCode);

      // Actualizar HTML lang attribute (SEO)
      this.updateHtmlLangAttribute(langCode);

      console.log(`✅ Language changed to: ${langCode}`);
    } catch (error) {
      console.error(`❌ Error loading language '${langCode}':`, error);
      // En caso de error, intentar cargar el idioma por defecto
      if (langCode !== this.DEFAULT_LANGUAGE) {
        await this.setLanguage(this.DEFAULT_LANGUAGE);
      }
    }
  }

  /**
   * Obtiene el idioma actual
   * @returns Código del idioma actual
   */
  public getCurrentLanguage(): string {
    return this.currentLanguageSignal();
  }

  /**
   * Obtiene el idioma actual como objeto Language
   * @returns Objeto Language con información completa
   */
  public getCurrentLanguageInfo(): Language {
    return this.currentLanguage();
  }

  /**
   * Traduce una clave instantáneamente (síncrona)
   * @param key - Clave de traducción
   * @param params - Parámetros opcionales para interpolación
   * @returns Texto traducido
   */
  public instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  /**
   * Traduce una clave de forma asíncrona (retorna Observable)
   * @param key - Clave de traducción
   * @param params - Parámetros opcionales para interpolación
   * @returns Observable con el texto traducido
   */
  public get(key: string, params?: any): Observable<string> {
    return this.translate.get(key, params);
  }

  /**
   * Traduce múltiples claves de una vez
   * @param keys - Array de claves de traducción
   * @returns Observable con objeto de traducciones
   */
  public getMultiple(keys: string[]): Observable<TranslationKey> {
    return this.translate.get(keys);
  }

  /**
   * Verifica si un idioma está soportado
   * @param langCode - Código del idioma
   * @returns true si está soportado, false si no
   */
  public isLanguageSupported(langCode: string): boolean {
    return this.SUPPORTED_LANGUAGES.some(lang => lang.code === langCode);
  }

  /**
   * Obtiene todos los idiomas soportados
   * @returns Array de objetos Language
   */
  public getSupportedLanguages(): Language[] {
    return [...this.SUPPORTED_LANGUAGES];
  }

  /**
   * Recarga las traducciones del idioma actual
   * Útil para refrescar traducciones después de cambios
   */
  public async reloadTranslations(): Promise<void> {
    const currentLang = this.getCurrentLanguage();
    await this.setLanguage(currentLang);
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Detecta el idioma del navegador
   * @returns Código del idioma detectado o null
   */
  private detectBrowserLanguage(): string | null {
    const browserLang = this.translate.getBrowserLang();

    if (browserLang && this.isLanguageSupported(browserLang)) {
      return browserLang;
    }

    // Intentar con el idioma base (ej: 'en-US' -> 'en')
    if (browserLang) {
      const baseLang = browserLang.split('-')[0];
      if (this.isLanguageSupported(baseLang)) {
        return baseLang;
      }
    }

    return null;
  }

  /**
   * Guarda el idioma en localStorage
   * @param langCode - Código del idioma a guardar
   */
  private saveLanguage(langCode: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, langCode);
    } catch (error) {
      console.warn('⚠️ Could not save language to localStorage:', error);
    }
  }

  /**
   * Obtiene el idioma guardado en localStorage
   * @returns Código del idioma guardado o null
   */
  private getStoredLanguage(): string | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored && this.isLanguageSupported(stored) ? stored : null;
    } catch (error) {
      console.warn('⚠️ Could not read language from localStorage:', error);
      return null;
    }
  }

  /**
   * Actualiza el atributo 'lang' del elemento HTML
   * Importante para SEO y accesibilidad
   * @param langCode - Código del idioma
   */
  private updateHtmlLangAttribute(langCode: string): void {
    try {
      document.documentElement.lang = langCode;
    } catch (error) {
      console.warn('⚠️ Could not update HTML lang attribute:', error);
    }
  }
}
