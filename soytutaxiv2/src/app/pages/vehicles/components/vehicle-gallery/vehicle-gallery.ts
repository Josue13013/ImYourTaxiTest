import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 🖼️ VehicleGalleryComponent
 * Galería de imágenes del vehículo
 */
@Component({
  selector: 'app-vehicle-gallery',
  imports: [CommonModule],
  templateUrl: './vehicle-gallery.html'
})
export class VehicleGalleryComponent implements OnChanges {
  private gsap = inject(GsapAnimationService);

  @Input() images: string[] = [];
  @ViewChild('mainImage') mainImage!: ElementRef;

  selectedIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // Reset selection when vehicle changes (images array changed)
    if (changes['images'] && !changes['images'].isFirstChange()) {
      this.selectedIndex = 0;
      this.animateMainImageEntrance();
    }
  }

  selectImage(index: number): void {
    if (this.selectedIndex === index) return;

    // Cross-fade animation
    if (this.gsap.isInBrowser() && this.mainImage) {
      const el = this.mainImage.nativeElement;

      // Fade Out
      this.gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.selectedIndex = index;
          // Fade In
          this.gsap.to(el, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
    } else {
      this.selectedIndex = index;
    }
  }

  private animateMainImageEntrance(): void {
    if (!this.gsap.isInBrowser() || !this.mainImage) return;

    this.gsap.fromTo(this.mainImage.nativeElement,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: this.gsap.EASING.power3 }
    );
  }

  get selectedImage(): string {
    return this.images[this.selectedIndex] || '';
  }
}
