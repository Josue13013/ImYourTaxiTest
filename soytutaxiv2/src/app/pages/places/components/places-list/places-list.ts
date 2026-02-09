import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CardComponent } from '../../../../shared/components/card/card';
import { debounceTime, distinctUntilChanged, Subscription, map } from 'rxjs';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 📍 PlacesListComponent
 * Lista de lugares recomendados con búsqueda reactiva
 */
@Component({
  selector: 'app-places-list',
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, CardComponent],
  templateUrl: './places-list.html'
})
export class PlacesListComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private gsap = inject(GsapAnimationService);

  searchControl = new FormControl('');
  filteredPlaces: any[] = [];
  private sub = new Subscription();

  places = [
    {
      image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
      title: 'places_palermo_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_palermo_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800',
      title: 'places_retiro_title',
      location: 'Retiro, Buenos Aires',
      description: 'places_retiro_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800',
      title: 'places_puerto_madero_title',
      location: 'Puerto Madero, Buenos Aires',
      description: 'places_puerto_madero_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800',
      title: 'places_colon_title',
      location: 'Centro, Buenos Aires',
      description: 'places_colon_description'
    },
    {
      image: 'https://static.vecteezy.com/system/resources/previews/011/881/270/large_2x/buenos-aires-argentina-september-04-2022-obelisk-of-buenos-aires-el-obelisco-a-national-historic-monument-located-at-republic-square-plaza-de-la-republica-free-photo.jpg',
      title: 'places_obelisco_title',
      location: 'Avenida 9 de Julio, Buenos Aires',
      description: 'places_obelisco_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      title: 'places_casa_rosada_title',
      location: 'Plaza de Mayo, Buenos Aires',
      description: 'places_casa_rosada_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      title: 'places_recoleta_title',
      location: 'Recoleta, Buenos Aires',
      description: 'places_recoleta_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
      title: 'places_caminito_title',
      location: 'La Boca, Buenos Aires',
      description: 'places_caminito_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800',
      title: 'places_san_telmo_title',
      location: 'San Telmo, Buenos Aires',
      description: 'places_san_telmo_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      title: 'places_jardin_botanico_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_jardin_botanico_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6?w=800',
      title: 'places_malba_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_malba_description'
    },
    {
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
      title: 'places_planetario_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_planetario_description'
    }
  ];

  ngOnInit(): void {
    this.filteredPlaces = [...this.places]; // Copia inicial

    this.sub.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(300), // RxJS Magic: Esperar 300ms
        distinctUntilChanged(), // Evitar búsquedas repetidas
        map(term => term?.toLowerCase().trim() || '')
      ).subscribe(term => {
        this.filterPlaces(term);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private filterPlaces(term: string): void {
    if (!term) {
      this.filteredPlaces = [...this.places];
    } else {
      this.filteredPlaces = this.places.filter(place => {
        // Buscamos en el título traducido y en la ubicación
        const title = this.translate.instant(place.title).toLowerCase();
        const location = place.location.toLowerCase();
        return title.includes(term) || location.includes(term);
      });
    }

    // Pequeña animación de entrada cuando se filtra
    // this.animateItems(); // (Opcional, implementar si hay tiempo)
  }
}
