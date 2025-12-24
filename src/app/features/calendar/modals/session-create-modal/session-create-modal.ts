import { Component, inject, ViewEncapsulation } from '@angular/core';
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

  public statusOptions: string[] = ['Borrador', 'Bloqueado', 'Oculto'];

  public form = this.fb.group({
    title: [''],
    description: [''],
    image: [''],
    category: ['Formación'],
    city: [''],
    date: [null as Date | null],
    status: ['borrador'],
  });

  private dialogRef = (() => {
    try {
      return inject(DynamicDialogRef as any) as DynamicDialogRef;
    } catch {
      return null;
    }
  })();

  private dialogConfig = (() => {
    try {
      return inject(DynamicDialogConfig as any) as DynamicDialogConfig;
    } catch {
      return null;
    }
  })();

  private session: SessionItem | null = null;

  constructor(public ref: DynamicDialogRef) {
    if (this.dialogConfig && this.dialogConfig.data && (this.dialogConfig.data as any).session) {
      this.session = (this.dialogConfig.data as any).session as SessionItem;
    }
    this._fillForm();
  }

  private _fillForm() {
    if (this.session) {
      this.form.patchValue({
        title: this.session.title ?? '',
        description: this.session.description ?? '',
        image: (this.session as any).image ?? '',
        category: this.session.category ?? this.availableCategories[0],
        city: this.session.city ?? '',
        date: new Date(this.session.date),
        status: this.session.status ?? this.statusOptions[0],
      });
    } else {
      this.form.reset({ category: this.availableCategories[0], status: this.statusOptions[0] });
    }
  }

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
    const id = (this.session && this.session.id) ? this.session.id : null;
    if (id) {
      this._calendarSvc.updateSession(id, payload).subscribe({
        next: (resp) => {
          if (resp) this.ref.close(resp);
        },
      });
    } else {
      this._calendarSvc.createSession(payload).subscribe({
        next: (resp) => {
          if (resp) this.ref.close(resp);
        },
        error: () => {},
      });
    }
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
