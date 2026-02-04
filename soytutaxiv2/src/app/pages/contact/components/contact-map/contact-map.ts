import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * 🗺️ ContactMapComponent
 * Mapa embebido de Google Maps para la página de contacto
 */
@Component({
  selector: 'app-contact-map',
  imports: [CommonModule],
  templateUrl: './contact-map.html'
})
export class ContactMapComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  @Input() latitude: number = -34.6037;
  @Input() longitude: number = -58.3816;
  @Input() zoom: number = 15;
  @Input() height: string = '400px';

  safeMapUrl: SafeResourceUrl | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude'] || !this.safeMapUrl) {
      this.updateMapUrl();
    }
  }

  private updateMapUrl(): void {
    const url = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13136.58!2d${this.longitude}!3d${this.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sar!4v1234567890!5m2!1sen!2sar`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
