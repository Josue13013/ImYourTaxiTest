import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * 💬 WhatsappButtonComponent
 * 
 * Botón flotante de WhatsApp para contacto rápido.
 * Aparece fixed en la esquina inferior derecha.
 * 
 * Características:
 * - Fixed position (bottom-right)
 * - Pulse animation
 * - Hover effect con scale
 * - Link directo a WhatsApp Web
 * - Mensaje predefinido configurable
 * 
 * @example
 * <app-whatsapp-button
 *   phoneNumber="+5491112345678"
 *   message="Hola! Quisiera más información"
 * />
 */
@Component({
  selector: 'app-whatsapp-button',
  imports: [CommonModule, TranslateModule],
  templateUrl: './whatsapp-button.html'
})
export class WhatsappButtonComponent {
  /**
   * Número de teléfono con código de país (ej: +5491112345678)
   */
  @Input() phoneNumber: string = '+5491112345678';

  /**
   * Mensaje predefinido
   */
  @Input() message: string = 'Hola! Quisiera más información sobre sus servicios.';

  /**
   * Tooltip text
   */
  @Input() tooltipText: string = 'Chat on WhatsApp';

  /**
   * Mostrar tooltip
   */
  @Input() showTooltip: boolean = true;

  /**
   * Construye el link de WhatsApp
   */
  get whatsappLink(): string {
    const encodedMessage = encodeURIComponent(this.message);
    const cleanPhone = this.phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
}
