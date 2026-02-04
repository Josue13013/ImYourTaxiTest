import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';
import { VehicleStateService } from '../../../../core/services/vehicle-state.service';

/**
 * 🚗 VehicleHeroSectionComponent
 * Hero section para página de vehículo individual
 */
@Component({
  selector: 'app-vehicle-hero-section',
  imports: [CommonModule, TranslateModule],
  templateUrl: './vehicle-hero-section.html'
})
export class VehicleHeroSectionComponent implements OnChanges {
  private gsap = inject(GsapAnimationService);
  private router = inject(Router);
  private vehicleState = inject(VehicleStateService);

  @Input() vehicleName: string = '';
  @Input() vehicleType: string = '';
  @Input() capacity: number = 4;
  @Input() pricePerHour: number = 0;
  @Input() image: string = '';

  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el nombre del vehículo (indicando cambio de selección), animamos entrada
    if (changes['vehicleName'] && !changes['vehicleName'].isFirstChange()) {
      this.animateEntrance();
    }
  }

  ngAfterViewInit() {
    // Animación inicial también
    this.animateEntrance();
  }

  bookNow(): void {
    // Mapear el tipo de vehículo al valor esperado por el formulario ('sedan' | 'suv' | 'van')
    // Asumimos que vehicleType viene como 'vehicles_sedan_type' (key de traducción)
    // o similar, necesitamos extraer el tipo.
    // Simplificación: usaremos el vehicleType crudo si coincide, o haremos un mapeo simple.

    // En vehicles.ts: type: 'vehicles_sedan_type'
    let typeSimpplified = 'sedan';
    if (this.vehicleType.includes('suv')) typeSimpplified = 'suv';
    if (this.vehicleType.includes('van') || this.capacity > 6) typeSimpplified = 'van';

    this.vehicleState.setSelectedVehicle(typeSimpplified);
    this.router.navigate(['/booking']);
  }

  private animateEntrance() {
    if (!this.gsap.isInBrowser()) return;

    // Kill previous animations if any (optional, but good practice)
    // this.gsap.killTweensOf([this.heroText.nativeElement, this.heroImage.nativeElement]);

    // Animate Text
    if (this.heroText) {
      this.gsap.from(this.heroText.nativeElement.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: this.gsap.EASING.power3,
        clearProps: 'all' // Limpiar props después para evitar problemas de CSS
      });
    }

    // Animate Image
    if (this.heroImage) {
      this.gsap.from(this.heroImage.nativeElement, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: this.gsap.EASING.power3,
        clearProps: 'all'
      });
    }
  }
}
