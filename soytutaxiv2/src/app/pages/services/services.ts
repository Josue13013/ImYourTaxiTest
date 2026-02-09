import { Component } from '@angular/core';
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
export class ServicesComponent {
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
}
