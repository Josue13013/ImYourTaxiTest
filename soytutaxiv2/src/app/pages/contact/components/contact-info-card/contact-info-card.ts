import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * 📇 ContactInfoCardComponent
 * Tarjeta de información de contacto
 */
@Component({
  selector: 'app-contact-info-card',
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact-info-card.html'
})
export class ContactInfoCardComponent {
  @Input() icon: string = 'pi pi-phone';
  @Input() title: string = '';
  @Input() info: string = '';
  @Input() linkUrl?: string;
}
