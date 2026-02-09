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
    { label: 'nav_home', route: '/' },
    { label: 'nav_services', route: '/services' },
    { label: 'nav_places', route: '/places' },
    { label: 'nav_vehicles', route: '/vehicles' },
    { label: 'nav_contact', route: '/contact' }
  ];

  /**
   * Redes sociales
   */
  socialLinks = [
    { icon: 'pi pi-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'pi pi-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'pi pi-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'pi pi-whatsapp', url: 'https://wa.me/5491112345678', label: 'WhatsApp' }
  ];

  /**
   * Información de contacto
   */
  contactInfo = [
    { icon: 'pi pi-phone', text: '+54 9 11 1234-5678' },
    { icon: 'pi pi-envelope', text: 'info@soytutaxi.com' },
    { icon: 'pi pi-map-marker', text: 'Buenos Aires, Argentina' }
  ];
}
