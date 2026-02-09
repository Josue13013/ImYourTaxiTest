import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * 🃏 CardComponent
 * 
 * Componente de tarjeta reutilizable con 3 variantes.
 * Usado en servicios, precios, lugares y contacto.
 * 
 * Variantes:
 * - default: Card estándar para servicios
 * - pricing: Card para tabla de precios con highlight
 * - recommendation: Card para lugares recomendados con imagen
 * 
 * Características:
 * - Inputs configurables
 * - Soporte para traducciones
 * - Glassmorphism effect
 * - Hover animations
 * - 100% responsive
 * 
 * @example
 * <app-card
 *   variant="default"
 *   icon="pi-plane"
 *   title="services_airport"
 *   description="services_airport_desc"
 * />
 */
@Component({
  selector: 'app-card',
  imports: [CommonModule, TranslateModule],
  templateUrl: './card.html'
})
export class CardComponent {
  /**
   * Variante del card
   */
  variant = input<'default' | 'pricing' | 'recommendation'>('default');

  /**
   * Ícono PrimeIcons (solo para variant='default')
   */
  icon = input<string | undefined>(undefined);

  /**
   * Título del card (clave de traducción)
   */
  title = input.required<string>();

  /**
   * Descripción/Subtítulo (clave de traducción)
   */
  description = input<string | undefined>(undefined);

  /**
   * Precio (solo para variant='pricing')
   */
  price = input<string | undefined>(undefined);

  /**
   * Moneda (solo para variant='pricing')
   */
  currency = input<string>('ARS');

  /**
   * Badge/etiqueta (solo para variant='pricing')
   */
  badge = input<string | undefined>(undefined);

  /**
   * Texto del botón (solo para variant='pricing')
   */
  buttonText = input<string | undefined>(undefined);

  /**
   * Destacar el card (solo para variant='pricing')
   */
  highlighted = input<boolean>(false);

  /**
   * URL de imagen (solo para variant='recommendation')
   */
  imageUrl = input<string | undefined>(undefined);

  /**
   * Alias para imageUrl (para compatibilidad)
   */
  image = input<string | undefined>(undefined);

  /**
   * Ubicación (solo para variant='recommendation')
   */
  location = input<string | undefined>(undefined);

  /**
   * Texto del enlace
   */
  linkText = input<string | undefined>(undefined);

  /**
   * URL del enlace
   */
  linkUrl = input<string | undefined>(undefined);

  /**
   * Lista de características/items (opcional)
   */
  features = input<string[] | undefined>(undefined);

  /**
   * Enlace opcional (deprecated - usar linkUrl)
   */
  link = input<string | undefined>(undefined);

  /**
   * Clase CSS adicional
   */
  customClass = input<string | undefined>(undefined);

  /**
   * Obtener URL de imagen (usa image o imageUrl)
   */
  finalImageUrl = computed(() => this.image() || this.imageUrl());

  
}
