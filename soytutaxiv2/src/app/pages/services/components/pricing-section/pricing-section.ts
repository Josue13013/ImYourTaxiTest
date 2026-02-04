import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/components/card/card';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 💰 PricingSectionComponent
 * Grid de precios con CardComponent variant pricing
 */
@Component({
    selector: 'app-pricing-section',
    imports: [CommonModule, TranslateModule, CardComponent],
    templateUrl: './pricing-section.html'
})
export class PricingSectionComponent implements AfterViewInit {
    private gsap = inject(GsapAnimationService);

    @ViewChild('pricingGrid') pricingGrid!: ElementRef;

    pricingPlans = [
        {
            title: 'pricing_ezeiza_title',
            price: '40000',
            currency: 'ARS',
            badge: '',
            highlighted: false
        },
        {
            title: 'pricing_aeroparque_title',
            price: '25000',
            currency: 'ARS',
            badge: 'pricing_popular',
            highlighted: true
        },
        {
            title: 'pricing_hourly_title',
            price: '8000',
            currency: 'ARS',
            badge: '',
            highlighted: false
        }
    ];

    ngAfterViewInit() {
        if (!this.gsap.isInBrowser()) return;

        const grid = this.pricingGrid.nativeElement;

        this.gsap.from(grid.children, {
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: this.gsap.EASING.power3
        });
    }
}
