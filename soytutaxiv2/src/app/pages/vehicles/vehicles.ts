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
      image: 'https://i.postimg.cc/fbnTcnVY/Volkswagen_Suran_3.jpg',
      images: [
        'https://i.postimg.cc/85TpYRBP/Whats_App_Image_2026_01_24_at_05_50_15_(12).jpg',
        'https://i.postimg.cc/HLwW3Z5H/Whats_App_Image_2026_01_24_at_05_50_15_(6).jpg',
        'https://i.postimg.cc/0Q9k4YdG/Whats_App_Image_2026_01_24_at_05_50_15.jpg'
      ]
    },
    {
      name: 'Mercedez-Benz Sprinter',
      type: 'vehicles_suv_type',
      capacity: 6,
      pricePerHour: 12000,
      image: 'https://i.postimg.cc/fbnTcnVC/Mercedez_Benz_Sprinter.jpg',
      images: [
        'https://i.postimg.cc/q7sBQbnv/Whats_App_Image_2026_01_24_at_05_50_15_(9).jpg',
        'https://i.postimg.cc/zfCDptWf/Whats_App_Image_2026_01_24_at_05_50_15_(10).jpg',
        'https://i.postimg.cc/QMGxQGF2/Whats_App_Image_2026_01_24_at_05_50_15_(3).jpg'
      ]
    }
  ];

  selectedVehicle = this.vehicles[0];
}
