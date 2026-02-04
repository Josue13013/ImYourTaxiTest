import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { PlacesListComponent } from './components/places-list/places-list';

/**
 * 📍 PlacesComponent
 * Página de lugares recomendados
 */
@Component({
  selector: 'app-places',
  imports: [
    CommonModule,
    TranslateModule,
    SectionHeaderComponent,
    PlacesListComponent
  ],
  templateUrl: './places.html'
})
export class PlacesComponent { }
