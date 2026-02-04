import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 📝 ContactFormComponent
 * Formulario de contacto con Reactive Forms y validaciones
 */
@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact-form.html'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private gsap = inject(GsapAnimationService);

  @ViewChild('formContainer') formContainer!: ElementRef;

  // Tipado estricto para el formulario
  contactForm = this.fb.group({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.pattern('^[0-9+\\- ]*$')] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] })
  });

  isSubmitting = false;
  showSuccess = false;

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      console.log('Form submitted:', this.contactForm.getRawValue());

      // Simulación de envío
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.contactForm.reset();

        // Hide success message after 3 seconds
        setTimeout(() => this.showSuccess = false, 3000);
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
      this.shakeForm();
    }
  }

  private shakeForm(): void {
    if (!this.gsap.isInBrowser() || !this.formContainer) return;

    // Efecto Shake para indicar error
    this.gsap.fromTo(this.formContainer.nativeElement,
      { x: -10 },
      { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' }
    );
  }

  get f() { return this.contactForm.controls; }
}
