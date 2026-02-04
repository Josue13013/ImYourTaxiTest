import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { BookingFormComponent } from '../services/components/booking-form/booking-form';

/**
 * 📅 BookingComponent (Page)
 * Página dedicada para realizar reservas
 */
@Component({
    selector: 'app-booking',
    imports: [
        CommonModule,
        TranslateModule,
        SectionHeaderComponent,
        BookingFormComponent
    ],
    templateUrl: './booking.html'
})
export class BookingComponent { }
