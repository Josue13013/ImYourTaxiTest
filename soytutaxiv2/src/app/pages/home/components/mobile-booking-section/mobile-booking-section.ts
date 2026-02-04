import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 📱 MobileBookingSectionComponent
 * Sección de app móvil con QR y links de descarga
 */
@Component({
  selector: 'app-mobile-booking-section',
  imports: [CommonModule, TranslateModule],
  templateUrl: './mobile-booking-section.html'
})
export class MobileBookingSectionComponent implements AfterViewInit {
  private gsap = inject(GsapAnimationService);

  @ViewChild('textContent') textContent!: ElementRef;
  @ViewChild('qrContent') qrContent!: ElementRef;

  appStoreUrl = 'https://apps.apple.com';
  playStoreUrl = 'https://play.google.com';
  qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://soytutaxi.com/app';

  ngAfterViewInit() {
    if (!this.gsap.isInBrowser()) return;

    // Animate Text Content (Slide Right) calling gsap.from directly to support scrollTrigger
    this.gsap.from(this.textContent.nativeElement, {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: this.textContent.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate QR Content (Scale In + Rotate)
    const qr = this.qrContent.nativeElement;
    this.gsap.from(qr, {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      duration: 1,
      ease: this.gsap.EASING.elastic,
      scrollTrigger: {
        trigger: qr,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}
