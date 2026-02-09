import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/components/card/card';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * ✈️ ServicesSectionComponent
 * Grid de servicios disponibles
 */
@Component({
    selector: 'app-services-section',
    imports: [CommonModule, TranslateModule, CardComponent],
    templateUrl: './services-section.html'
})
export class ServicesSectionComponent implements AfterViewInit {
    private gsap = inject(GsapAnimationService);

    @ViewChild('cardsGrid') cardsGrid!: ElementRef;

    services = [
        {
            icon: 'fa-solid fa-plane',
            title: 'services_airports_title',
            description: 'services_airports_description'
        },
        {
            icon: 'fa-solid fa-users',
            title: 'services_groups_title',
            description: 'services_groups_description'
        },
        {
            icon: 'fa-solid fa-briefcase',
            title: 'services_corporate_title',
            description: 'services_corporate_description'
        },
        {
            icon: 'fa-solid fa-calendar',
            title: 'services_scheduled_title',
            description: 'services_scheduled_description'
        }
    ];

    ngAfterViewInit() {
        if (!this.gsap.isInBrowser()) return;

        const grid = this.cardsGrid.nativeElement;
        // Animamos los hijos del grid (las cards)
        this.gsap.from(grid.children, {
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%', // Inicia cuando el top del grid está al 85% del viewport
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: this.gsap.EASING.power3
        });
    }
}
