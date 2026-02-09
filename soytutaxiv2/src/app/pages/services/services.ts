import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';

/**
 * 💼 ServicesComponent
 * Página detallada de servicios
 */
@Component({
    selector: 'app-services',
    imports: [
        CommonModule,
        TranslateModule,
        SectionHeaderComponent
    ],
    templateUrl: './services.html'
})
export class ServicesComponent implements OnInit, OnDestroy {
    /**
     * Servicios principales detallados
     */
    services = [
        {
            icon: 'pi pi-send',
            title: 'services_airport_title',
            description: 'services_airport_description',
            features: [
                'services_airport_feature_1',
                'services_airport_feature_2',
                'services_airport_feature_3',
                'services_airport_feature_4'
            ],
            price: '40.000',
            currency: 'ARS',
            cta: 'services_book_now'
        },
        {
            icon: 'pi pi-map',
            title: 'services_tours_title',
            description: 'services_tours_description',
            features: [
                'services_tours_feature_1',
                'services_tours_feature_2',
                'services_tours_feature_3',
                'services_tours_feature_4'
            ],
            price: '25.000',
            currency: 'ARS',
            cta: 'services_book_now'
        },
        {
            icon: 'pi pi-briefcase',
            title: 'services_corporate_title',
            description: 'services_corporate_description',
            features: [
                'services_corporate_feature_1',
                'services_corporate_feature_2',
                'services_corporate_feature_3',
                'services_corporate_feature_4'
            ],
            price: null,
            currency: 'ARS',
            cta: 'services_request_quote'
        },
        {
            icon: 'pi pi-users',
            title: 'services_groups_title',
            description: 'services_groups_description',
            features: [
                'services_groups_feature_1',
                'services_groups_feature_2',
                'services_groups_feature_3',
                'services_groups_feature_4'
            ],
            price: null,
            currency: 'ARS',
            cta: 'services_request_quote'
        },
        {
            icon: 'pi pi-calendar',
            title: 'services_scheduled_title',
            description: 'services_scheduled_description',
            features: [
                'services_scheduled_feature_1',
                'services_scheduled_feature_2',
                'services_scheduled_feature_3',
                'services_scheduled_feature_4'
            ],
            price: '30.000',
            currency: 'ARS',
            cta: 'services_book_now'
        },
        {
            icon: 'pi pi-star',
            title: 'services_vip_title',
            description: 'services_vip_description',
            features: [
                'services_vip_feature_1',
                'services_vip_feature_2',
                'services_vip_feature_3',
                'services_vip_feature_4'
            ],
            price: null,
            currency: 'ARS',
            cta: 'services_request_quote'
        }
    ];

    /**
     * Preguntas frecuentes
     */
    faqs = [
        {
            question: 'services_faq_1_question',
            answer: 'services_faq_1_answer'
        },
        {
            question: 'services_faq_2_question',
            answer: 'services_faq_2_answer'
        },
        {
            question: 'services_faq_3_question',
            answer: 'services_faq_3_answer'
        },
        {
            question: 'services_faq_4_question',
            answer: 'services_faq_4_answer'
        }
    ];

    cards = [
        {
        icon: '✈️', // Replace with actual icon or SVG
        title: 'Airport Transfers',
        description: 'Professional and punctual transfers to Ezeiza and Aeroparque airports. Door-to-door service with flight tracking.',
        bullets: [
            '24/7 availability',
            'Flight tracking included',
            'Meet & Greet service',
            'Up to 4 passengers + luggage'
        ],
        price: 'ARS 40.000',
        button: 'Book Now'
        },
        {
        icon: '📍',
        title: 'City Tours',
        description: 'Explore Buenos Aires with our personalized guided tours. Visit the most iconic neighborhoods and landmarks.',
        bullets: [
            'Bilingual professional guides',
            'Customizable itineraries',
            '4-8 hour durations',
            'Small group options'
        ],
        price: 'ARS 25.000',
        button: 'Book Now'
        },
        {
        icon: '💼',
        title: 'Servicios Corporativos',
        description: 'Servicio profesional para empresas y ejecutivos.',
        bullets: [
            'Priority booking',
            'Monthly invoicing',
            'Dedicated account manager',
            'Volume discounts'
        ],
        price: null,
        button: 'Request Quote'
        }
    ];

    // Carousel properties
    servicesForCarousel: any[] = [];
    navigationDots: number[] = [];
    currentSlide = 0;
    carouselTransform = 0;
    private autoScrollInterval: any;
    private isHovered = false;

    ngOnInit() {
        // Duplicate services for infinite scroll effect
        this.servicesForCarousel = [...this.services, ...this.services];
        
        // Calculate number of navigation dots (6 services / 3 per view = 2 slides, but we show 4 for smooth scrolling)
        const totalSlides = Math.ceil(this.services.length / 3);
        this.navigationDots = Array(totalSlides).fill(0).map((_, i) => i);
        
        this.startAutoScroll();
    }

    ngOnDestroy() {
        this.stopAutoScroll();
    }

    /**
     * Start automatic carousel scrolling
     */
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (!this.isHovered) {
                this.nextSlide();
            }
        }, 5000); // 5 seconds interval for smooth, not fast scrolling
    }

    /**
     * Stop automatic scrolling
     */
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }

    /**
     * Pause carousel on hover
     */
    pauseCarousel() {
        this.isHovered = true;
    }

    /**
     * Resume carousel when mouse leaves
     */
    resumeCarousel() {
        this.isHovered = false;
    }

    /**
     * Move to next slide
     */
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.navigationDots.length;
        this.updateCarouselPosition();
    }

    /**
     * Go to specific slide
     */
    goToSlide(index: number) {
        this.currentSlide = index;
        this.updateCarouselPosition();
    }

    /**
     * Update carousel transform position
     */
    updateCarouselPosition() {
        // Calculate the width of one card including gap
        // Each card is 1/3 of container width, gap is 24px (6 * 4px)
        const cardWidthPercentage = 100 / 3;
        const gapInPixels = 24;
        
        // Transform based on current slide
        // We use percentage for responsive design
        this.carouselTransform = -(this.currentSlide * (cardWidthPercentage + 2)); // 2% accounts for gap
    }
}
