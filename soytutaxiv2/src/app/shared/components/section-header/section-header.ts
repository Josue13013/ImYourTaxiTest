import { Component, input, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GsapAnimationService } from '../../../core/services/gsap-animation';

/**
 * 📋 SectionHeaderComponent
 * 
 * Componente reutilizable para encabezados de secciones.
 * Usado en todas las páginas y secciones de la aplicación.
 * 
 * Características:
 * - Inputs configurables (subtitle, title, text)
 * - Soporte para traducciones
 * - Animaciones de entrada con GSAP
 * - Diseño premium con paleta azul oscura
 * - Totalmente responsive
 * 
 * @example
 * <app-section-header
 *   subtitle="services_subtitle"
 *   title="services_title"
 *   [centerText]="true"
 * />
 */
@Component({
  selector: 'app-section-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './section-header.html'
})
export class SectionHeaderComponent implements AfterViewInit {
  private gsap = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);

  /**
   * Subtítulo de la sección (clave de traducción)
   */
  subtitle = input<string | undefined>(undefined);

  /**
   * Título principal de la sección (clave de traducción)
   */
  title = input.required<string>();

  /**
   * Texto adicional opcional (clave de traducción)
   */
  text = input<string | undefined>(undefined);

  /**
   * Centrar el texto (por defecto false)
   */
  centerText = input<boolean>(false);

  /**
   * Variante de color (por defecto 'light')
   */
  variant = input<'light' | 'dark'>('light');

  /**
   * Deshabilitar animaciones
   */
  disableAnimation = input<boolean>(false);

  ngAfterViewInit(): void {
    if (!this.disableAnimation() && this.gsap.isInBrowser()) {
      this.animateIn();
    }
  }

  /**
   * Anima la entrada del componente con GSAP
   */
  private animateIn(): void {
    const element = this.elementRef.nativeElement;
    const children = element.querySelectorAll('.section-header__subtitle, .section-header__title, .section-header__text');

    this.gsap.staggerFadeIn(children, {
      duration: 0.8,
      stagger: 0.2,
      delay: 0.1
    });
  }
}
