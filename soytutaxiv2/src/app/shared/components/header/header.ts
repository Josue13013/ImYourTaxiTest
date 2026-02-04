import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector';
import { GsapAnimationService } from '../../../core/services/gsap-animation';

/**
 * 📍 HeaderComponent
 * 
 * Header/Navbar de la aplicación con navegación y selector de idioma.
 * Ahora con animaciones GSAP para efecto glassmorphism dinámico.
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive, LanguageSelectorComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements AfterViewInit {
  private gsap = inject(GsapAnimationService);

  @ViewChild('headerRef') headerRef!: ElementRef;

  /**
   * Estado del menú móvil
   */
  protected mobileMenuOpen = false;

  /**
   * Links de navegación
   */
  protected navLinks = [
    { label: 'nav_home', route: '/', icon: 'pi pi-home' },
    { label: 'nav_services', route: '/services', icon: 'pi pi-briefcase' },
    { label: 'nav_places', route: '/places', icon: 'pi pi-map-marker' },
    { label: 'nav_vehicles', route: '/vehicles', icon: 'pi pi-car' },
    { label: 'nav_booking', route: '/booking', icon: 'pi pi-calendar-plus' },
    { label: 'nav_contact', route: '/contact', icon: 'pi pi-envelope' }
  ];

  /**
   * Inicializar animaciones de scroll
   */
  ngAfterViewInit(): void {
    if (!this.gsap.isInBrowser()) return;

    this.initScrollEffect();
  }

  private initScrollEffect(): void {
    const header = this.headerRef.nativeElement;

    // Estado inicial: Transparente (o semi) si estamos arriba
    // Pero como usamos Tailwind classes, vamos a animar propiedades CSS

    // Animar background y blur al scrollear
    this.gsap.getScrollTrigger().create({
      start: 'top -50',
      end: 99999, // Forever
      toggleClass: { targets: header, className: 'scrolled-glass' },
      onUpdate: (self) => {
        // Opcional: animar altura o padding si se desea
        if (self.scroll() > 20) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      }
    });
  }

  /**
   * Toggle menú móvil
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Cerrar menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
