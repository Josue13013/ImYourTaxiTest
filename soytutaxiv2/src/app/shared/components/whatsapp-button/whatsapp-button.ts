import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-whatsapp-button',
  imports: [CommonModule, TranslateModule],
  templateUrl: './whatsapp-button.html'
})
export class WhatsappButtonComponent {
  private translate = inject(TranslateService);

  @Input() phoneNumber: string = '+5491112345678';
  @Input() showTooltip: boolean = true;

  get whatsappLink(): string {
    const message = this.translate.instant('whatsapp_message');
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = this.phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
}
