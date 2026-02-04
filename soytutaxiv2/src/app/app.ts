import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button';
import { FooterComponent } from './shared/components/footer/footer';
import { HeaderComponent } from './shared/components/header/header';
import { TranslationService } from './core/services/translation';

import { GsapAnimationService } from './core/services/gsap-animation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, WhatsappButtonComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private translationService = inject(TranslationService);
  private translate = inject(TranslateService); // ngx-translate service
  private gsap = inject(GsapAnimationService);

  ngOnInit(): void {
    // CRITICAL: Activar el idioma por defecto
    this.translate.use('en');
    console.log('🚀 App initialized');
    console.log('📍 Current language:', this.translationService.getCurrentLanguage());
  }

  /**
   * 🎬 Route Transition Handler
   * Se ejecuta cada vez que el Router activa un componente.
   * Aplica una animación suave de entrada (Fade + Slide Up).
   */
  onRouteActivate(component: any): void {
    if (!component) return;

    // Verificar si el componente tiene ElementRef (lo ideal es que los containers principales inyecten ElementRef)
    // O intentamos animar el 'host' element si es posible acceder.
    // Hack: En Angular Standalone, 'component' es la instancia. 
    // Para animar necesitamos el nodo DOM. 
    // Opción A: Usar <router-outlet> container wrapper.
    const element = component.elementRef?.nativeElement || document.querySelector('router-outlet + *') || document.querySelector('main > :last-child');

    if (element) {
      this.gsap.fadeIn(element, {
        duration: 0.6,
        delay: 0.1,
        ease: this.gsap.EASING.entrance
      });

      // Scroll to top suave al cambiar
      window.scrollTo(0, 0);
    }
  }
}
