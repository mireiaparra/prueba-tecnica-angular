import { Component, inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarService } from '../../calendar.service';
import { SessionItem } from '../../../../core/models/Session.interface';
@Component({
  standalone: true,
  selector: 'app-session-create-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    FileUploadModule,
    ButtonModule,
    TextareaModule,
  ],
  templateUrl: './session-create-modal.html',
  styleUrls: ['./session-create-modal.scss'],
})
export class SessionCreateModal {
  private fb = inject(FormBuilder);
  private _calendarSvc = inject(CalendarService);
  public availableCategories: string[] = ['Formación', 'Reunión', 'Demo'];

  public statusOptions: string[] = ['Disponible', 'Reservado', 'Cancelado'];

  public form = this.fb.group({
    title: [''],
    description: [''],
    image: [''],
    category: ['Formación'],
    city: [''],
    date: [null],
    status: ['borrador'],
  });

  constructor(public ref: DynamicDialogRef) {}

  onSubmit() {
    const raw = this.form.value as any;
    const payload: Partial<SessionItem> = {
      title: raw.title,
      description: raw.description,
      category: raw.category,
      city: raw.city,
      status: raw.status,
      date: raw.date instanceof Date ? raw.date.toISOString() : raw.date,
      image: raw.image,
    };
    this._calendarSvc.createSession(payload).subscribe({
      next: (resp) => {
        if (resp) {
          this.ref.close(resp);
        }
      },
      error: () => {},
    });
  }

  onCancel() {
    this.ref.close();
  }

  onFileUpload(event: any) {
    const file = event?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.form.patchValue({ image: reader.result as string });
    reader.readAsDataURL(file);
  }
}
