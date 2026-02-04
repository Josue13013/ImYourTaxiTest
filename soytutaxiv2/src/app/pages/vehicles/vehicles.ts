import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { VehicleHeroSectionComponent } from './components/vehicle-hero-section/vehicle-hero-section';
import { VehicleGalleryComponent } from './components/vehicle-gallery/vehicle-gallery';

/**
 * 🚗 VehiclesComponent
 * Página de vehículos/flota
 */
@Component({
  selector: 'app-vehicles',
  imports: [
    CommonModule,
    TranslateModule,
    SectionHeaderComponent,
    VehicleHeroSectionComponent,
    VehicleGalleryComponent
  ],
  templateUrl: './vehicles.html'
})
export class VehiclesComponent {
  vehicles = [
    {
      name: 'Sedan Premium',
      type: 'vehicles_sedan_type',
      capacity: 4,
      pricePerHour: 8000,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
      images: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800'
      ]
    },
    {
      name: 'SUV Comfort',
      type: 'vehicles_suv_type',
      capacity: 6,
      pricePerHour: 12000,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
      ]
    }
  ];

  selectedVehicle = this.vehicles[0];
}
