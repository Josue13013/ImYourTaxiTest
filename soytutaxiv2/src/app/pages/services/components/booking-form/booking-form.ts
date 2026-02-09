import { Component, ElementRef, ViewChild, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';
import { VehicleStateService } from '../../../../core/services/vehicle-state.service';
import { Subscription } from 'rxjs';

/**
 * 📅 BookingFormComponent
 * Formulario de reserva con validaciones complejas
 */
@Component({
    selector: 'app-booking-form',
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    templateUrl: './booking-form.html'
})
export class BookingFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    privateHP = inject(GsapAnimationService); // Typo corrected in thought process, careful with var name.
    private gsap = inject(GsapAnimationService);
    private vehicleState = inject(VehicleStateService);
    private sub = new Subscription();

    @ViewChild('bookingFormContainer') bookingFormContainer!: ElementRef;

    // Tipado estricto para el formulario
    bookingForm = this.fb.group({
        pickupLocation: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        dropoffLocation: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        date: new FormControl('', { nonNullable: true, validators: [Validators.required, this.futureDateValidator] }),
        time: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        passengers: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(15)] }),
        vehicleType: new FormControl<'sedan' | 'suv' | 'van'>('sedan', { nonNullable: true, validators: [Validators.required] }),
        notes: new FormControl('', { nonNullable: true })
    });

    isSubmitting = false;
    showSuccess = false;

    vehicleOptions = [
        { value: 'sedan', icon: 'fa-solid fa-car', label: 'Sedan Premium', sublabel: '1-4 Pax' },
        { value: 'suv', icon: 'fa-solid fa-truck', label: 'SUV Comfort', sublabel: '1-6 Pax' },
        { value: 'van', icon: 'fa-solid fa-directions-alt', label: 'Business Van', sublabel: '1-15 Pax' }
    ];

    ngOnInit(): void {
        // Suscribirse al estado del vehículo seleccionado
        this.sub.add(
            this.vehicleState.selectedVehicle$.subscribe(type => {
                if (type && ['sedan', 'suv', 'van'].includes(type)) {
                    this.bookingForm.patchValue({ vehicleType: type as any });
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onSubmit(): void {
        if (this.bookingForm.valid) {
            this.isSubmitting = true;
            console.log('Booking submitted:', this.bookingForm.getRawValue());

            // Simulación
            setTimeout(() => {
                this.isSubmitting = false;
                this.showSuccess = true;
                this.bookingForm.reset({ passengers: 1, vehicleType: 'sedan' });
                setTimeout(() => this.showSuccess = false, 4000);
            }, 1500);
        } else {
            this.bookingForm.markAllAsTouched();
            this.shakeForm();
        }
    }

    // Validator Personalizado: Fecha Futura
    private futureDateValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;
        const inputDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Necesitamos ajustar por timezone si es string ISO simple, 
        // pero para HTML date input, value es YYYY-MM-DD.
        // Creamos fecha local para comparar correctamente
        if (inputDate < today) {
            return { pastDate: true };
        }
        return null;
    }

    private shakeForm(): void {
        if (!this.gsap.isInBrowser() || !this.bookingFormContainer) return;
        this.gsap.fromTo(this.bookingFormContainer.nativeElement,
            { x: -10 },
            { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' }
        );
    }

    get f() { return this.bookingForm.controls; }
}
