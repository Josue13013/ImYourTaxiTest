import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

export interface AppEvent<T = any> {
    name: string;
    payload?: T;
}

@Injectable({ providedIn: 'root' })
export class EventBusService {
    private subject = new Subject<AppEvent>();

    /**
     * Emitir un evento global
     * @param name Nombre del evento (ej: 'BOOKING_SUCCESS')
     * @param payload Datos opcionales
     */
    emit<T>(name: string, payload?: T): void {
        this.subject.next({ name, payload });
    }

    /**
     * Escuchar un evento específico
     * @param eventName Nombre del evento a escuchar
     */
    on<T>(eventName: string): Observable<T> {
        return this.subject.pipe(
            filter(e => e.name === eventName),
            map(e => e.payload as T)
        );
    }
}
