import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * 🔽 FooterComponent
 * 
 * Footer de la aplicación con links, información y redes sociales.
 * 
 * Características:
 * - Logo y descripción
 * - Links de navegación
 * - Información de contacto
 * - Redes sociales
 * - Copyright
 * - Responsive
 * 
 * @example
 * <app-footer />
 */
@Component({
  selector: 'app-footer',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './footer.html'
})
export class FooterComponent {
  /**
   * Año actual para copyright
   */
  currentYear = new Date().getFullYear();

  /**
   * Links de navegación
   */
  navLinks = [
    { label: 'footer_home', route: '/' },
    { label: 'footer_services', route: '/services' },
    { label: 'footer_places', route: '/places' },
    { label: 'footer_vehicles', route: '/vehicles' },
    { label: 'footer_contact', route: '/contact' }
  ];

  /**
   * Redes sociales
   */
  socialLinks = [
    { icon: 'fa-brands fa-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'fa-brands fa-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/5491112345678', label: 'WhatsApp' }
  ];

  /**
   * Información de contacto
   */
  contactInfo = [
    { icon: 'fa-solid fa-phone', text: '+54 9 11 1234-5678' },
    { icon: 'fa-solid fa-envelope', text: 'info@soytutaxi.com' },
    { icon: 'fa-solid fa-map-marker', text: 'Buenos Aires, Argentina' }
  ];
}
