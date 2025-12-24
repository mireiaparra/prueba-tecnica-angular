import { Component, inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
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
    ButtonModule,
    TextareaModule,
  ],
  templateUrl: './session-create-modal.html',
  styleUrls: ['./session-create-modal.scss'],
})
export class SessionCreateModal {
  private fb = inject(FormBuilder);
  private _calendarSvc = inject(CalendarService);
  public ref: DynamicDialogRef | null = null;
  public config = inject(DynamicDialogConfig);

  @Output() created = new EventEmitter<SessionItem>();

  public categoryOptions = [
    { label: 'General', value: 'general' },
    { label: 'Tech', value: 'tech' },
    { label: 'Business', value: 'business' },
  ];

  public statusOptions = [
    { label: 'borrador', value: 'borrador' },
    { label: 'bloqueado', value: 'bloqueado' },
    { label: 'oculto', value: 'oculto' },
  ];

  public form = this.fb.group({
    title: [''],
    description: [''],
    category: ['general'],
    city: [''],
    date: [null],
    status: ['borrador'],
  });

  onSubmit() {
    const raw = this.form.value as any;
    const payload: Partial<SessionItem> = {
      title: raw.title,
      description: raw.description,
      category: raw.category,
      city: raw.city,
      status: raw.status,
      date: raw.date instanceof Date ? raw.date.toISOString() : raw.date,
    };
    this._calendarSvc.createSession(payload).subscribe((created) => {
      if (this.ref && this.ref.close) this.ref.close(created);
      else this.created.emit(created);
    });
  }
}
