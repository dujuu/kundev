import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Access Key de Web3Forms (https://web3forms.com), asociada a contacto.kundev@gmail.com.
// Es seguro exponerla en el frontend: solo reenvía el formulario a ese correo.
const WEB3FORMS_ACCESS_KEY = 'c5c9938e-09bd-44cc-845c-c9a04541b055';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-cotizar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cotizar.html',
  styleUrl: './cotizar.scss'
})
export class Cotizar {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly status = signal<SubmitStatus>('idle');

  readonly form = this.fb.nonNullable.group({
    nombre: [''],
    email: ['', [Validators.required, Validators.email]],
    idea: ['', [Validators.required, Validators.minLength(10)]],
    // honeypot anti-spam: debe quedar vacío
    botcheck: ['']
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    const value = this.form.getRawValue();

    this.http
      .post<{ success: boolean }>('https://api.web3forms.com/submit', {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Nueva solicitud de cotización — KunDev',
        from_name: 'KunDev Web',
        name: value.nombre || 'Sin nombre',
        email: value.email,
        message: value.idea,
        botcheck: value.botcheck
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.status.set('success');
            this.form.reset();
          } else {
            this.status.set('error');
          }
        },
        error: () => this.status.set('error')
      });
  }
}
