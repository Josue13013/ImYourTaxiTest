import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { ContactMapComponent } from './components/contact-map/contact-map';
import { ContactInfoCardComponent } from './components/contact-info-card/contact-info-card';
import { ContactFormComponent } from './components/contact-form/contact-form';

/**
 * 📧 ContactComponent
 * Página de contacto completa
 */
@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    TranslateModule,
    SectionHeaderComponent,
    ContactMapComponent,
    ContactInfoCardComponent,
    ContactFormComponent
  ],
  templateUrl: './contact.html'
})
export class ContactComponent {
  contactCards = [
    {
      icon: 'pi pi-phone',
      title: 'contact_phone_title',
      info: '+54 9 11 1234-5678',
      linkUrl: 'tel:+5491112345678'
    },
    {
      icon: 'pi pi-envelope',
      title: 'contact_email_title',
      info: 'info@soytutaxi.com',
      linkUrl: 'mailto:info@soytutaxi.com'
    },
    {
      icon: 'pi pi-map-marker',
      title: 'contact_location_title',
      info: 'Buenos Aires, Argentina'
    }
  ];
}
