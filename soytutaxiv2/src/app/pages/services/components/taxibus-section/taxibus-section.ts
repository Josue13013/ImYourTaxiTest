import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 🚐 TaxibusSectionComponent
 * Sección de servicio de taxibus
 */
@Component({
    selector: 'app-taxibus-section',
    imports: [CommonModule, TranslateModule],
    templateUrl: './taxibus-section.html'
})
export class TaxibusSectionComponent implements AfterViewInit {
    private gsap = inject(GsapAnimationService);

    @ViewChild('featuresGrid') featuresGrid!: ElementRef;
    @ViewChild('ctaButton') ctaButton!: ElementRef;

    features = [
        { icon: 'fa-solid fa-users', text: 'taxibus_capacity' },
        { icon: 'fa-solid fa-shield', text: 'taxibus_safety' },
        { icon: 'fa-solid fa-dollar', text: 'taxibus_price' },
        { icon: 'fa-solid fa-clock', text: 'taxibus_schedule' }
    ];

    ngAfterViewInit() {
        if (!this.gsap.isInBrowser()) return;

        // Animate Features Stagger
        const grid = this.featuresGrid.nativeElement;
        this.gsap.from(grid.children, {
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15
        });

        // Animate Button Scale
        this.gsap.from(this.ctaButton.nativeElement, {
            scrollTrigger: {
                trigger: this.ctaButton.nativeElement,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: this.gsap.EASING.back
        });
    }
}
