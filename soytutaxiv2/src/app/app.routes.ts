import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        title: 'SoyTuTaxi - Airport Transfers & Tours'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
        title: 'Contact Us - SoyTuTaxi'
    },
    {
        path: 'places',
        loadComponent: () => import('./pages/places/places').then(m => m.PlacesComponent),
        title: 'Recommended Places - SoyTuTaxi'
    },
    {
        path: 'vehicles',
        loadComponent: () => import('./pages/vehicles/vehicles').then(m => m.VehiclesComponent),
        title: 'Our Fleet - SoyTuTaxi'
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent),
        title: 'Services - SoyTuTaxi'
    },
    {
        path: 'booking',
        loadComponent: () => import('./pages/booking/booking').then(m => m.BookingComponent),
        title: 'Book a Ride - SoyTuTaxi'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
