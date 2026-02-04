import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleStateService {
    // Estado inicial: 'sedan' por defecto
    private selectedVehicleSubject = new BehaviorSubject<string>('sedan');

    // Observable público para que los componentes se suscriban
    selectedVehicle$ = this.selectedVehicleSubject.asObservable();

    /**
     * Actualizar el vehículo seleccionado
     * @param vehicleType Tipo de vehículo ('sedan', 'suv', 'van')
     */
    setSelectedVehicle(vehicleType: string): void {
        this.selectedVehicleSubject.next(vehicleType);
    }

    /**
     * Obtener el valor actual (snapshot) sin suscribirse
     */
    getCurrentVehicle(): string {
        return this.selectedVehicleSubject.value;
    }
}
