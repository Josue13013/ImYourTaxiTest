import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { HeroSectionComponent } from './components/hero-section/hero-section';
import { ServicesSectionComponent } from '../services/components/services-section/services-section';
import { PricingSectionComponent } from '../services/components/pricing-section/pricing-section';
import { MobileBookingSectionComponent } from './components/mobile-booking-section/mobile-booking-section';
import { TaxibusSectionComponent } from '../services/components/taxibus-section/taxibus-section';

/**
 * 🏠 HomeComponent
 * Página principal/landing page
 * 
 * Esta es la página más compleja, ensamblando múltiples secciones:
 * - Hero con CTA
 * - Servicios disponibles
 * - Precios
 * - App móvil
 * - Taxibus
 */
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    TranslateModule,
    SectionHeaderComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    PricingSectionComponent,
    MobileBookingSectionComponent,
    TaxibusSectionComponent
  ],
  templateUrl: './home.html'
})
export class HomeComponent { }
