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
      image: 'https://palermoweb.com.ar/wp-content/uploads/2024/10/Palermo-Soho-1024x579.jpg',
      title: 'places_palermo_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_palermo_description'
    },
    {
      image: 'https://thumbs.dreamstime.com/z/buenos-aires-argentina-june-newly-renovated-retiro-train-station-newly-renovated-retiro-train-station-156611027.jpg',
      title: 'places_retiro_title',
      location: 'Retiro, Buenos Aires',
      description: 'places_retiro_description'
    },
    {
      image: 'https://cache.quantocustaviajar.com/blog/wp-content/uploads/2018/06/Puerto_decima_Deensel-1920x1483.jpg',
      title: 'places_puerto_madero_title',
      location: 'Puerto Madero, Buenos Aires',
      description: 'places_puerto_madero_description'
    },
    {
      image: 'https://teatrocolon.org.ar/wp-content/uploads/2023/11/frente-teatro-colon.jpeg',
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
      image: 'https://elobjetivo.com.ar/download/multimedia.normal.8e515acf0edb3aba.496e746572696f7243617361526f7361646130303031375f6e6f726d616c2e6a7067.jpg',
      title: 'places_casa_rosada_title',
      location: 'Plaza de Mayo, Buenos Aires',
      description: 'places_casa_rosada_description'
    },
    {
      image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/cementerio-recoleta-pasillo-interno-1500x610-nn_0.jpg',
      title: 'places_recoleta_title',
      location: 'Recoleta, Buenos Aires',
      description: 'places_recoleta_description'
    },
    {
      image: 'https://www.omundoeseu.com.br/wp-content/uploads/2022/11/caminito-in-la-boca-neighborhood-buenos-aires-argentina-a-beautiful-colorful-travel-destination.jpg',
      title: 'places_caminito_title',
      location: 'La Boca, Buenos Aires',
      description: 'places_caminito_description'
    },
    {
      image: 'https://solsalute.com/wp-content/uploads/2022/05/Depositphotos_445366550_S-1-768x512.jpg',
      title: 'places_san_telmo_title',
      location: 'San Telmo, Buenos Aires',
      description: 'places_san_telmo_description'
    },
    {
      image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/05/02052513/Botanical-Gardens.jpg',
      title: 'places_jardin_botanico_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_jardin_botanico_description'
    },
    {
      image: 'https://media.cntraveler.com/photos/5afdcdf214fc2e4005aaead6/16:9/w_2560,c_limit/Museo-de-Arte-Latinoamericano-de-Buenos-Aires-Malba-(MALBA)_GettyImages-875493478.jpg?mbid=social_retweet',
      title: 'places_malba_title',
      location: 'Palermo, Buenos Aires',
      description: 'places_malba_description'
    },
    {
      image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/planetario_noche_1200.jpg',
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
