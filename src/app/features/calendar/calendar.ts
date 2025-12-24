import { Component, inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarService } from './calendar.service';
import { AuthService } from '../../core/auth.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { SessionFilters, SessionItem } from '../../core/models/Session.interface';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { SessionCreateModal } from './modals/session-create-modal/session-create-modal';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,
    InputTextModule,
    CapitalizePipe,
    DynamicDialogModule,
    ButtonModule,
  ],
  providers: [DialogService],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class Calendar {
  private calendarSvc = inject(CalendarService);
  private dialog = inject(DialogService);
  private auth = inject(AuthService);

  public isAdmin = this.auth.getRole() === 'admin';

  public sessions: SessionItem[] = [];

  public month: Date = new Date();
  public filters: SessionFilters = {
    month: this._formatMonth(new Date()),
  };

  public availableCategories: string[] = ['Formación', 'Reunión', 'Demo'];

  public statusOptions: string[] = ['Borrador', 'Bloqueado', 'Oculto'];
  public weekDays: string[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
  ];

  public weekdayName(date: Date): string {
    return date.toLocaleDateString('es-ES', { weekday: 'long' });
  }

  public monthShort(date: Date): string {
    return date.toLocaleString('es-ES', { month: 'short' }).replace('.', '');
  }

  public isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  public isPast(date: Date): boolean {
    const today = new Date();
    const dOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const tOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dOnly < tOnly;
  }

  public categoryClass(category?: string) {
    switch ((category || '').toLowerCase()) {
      case 'formación':
      case 'formacion':
        return 'cat-formation';
      case 'reunión':
      case 'reunion':
        return 'cat-meeting';
      case 'demo':
        return 'cat-demo';
      default:
        return 'cat-default';
    }
  }

  public statusClass(status?: string) {
    switch ((status || '').toLowerCase()) {
      case 'borrador':
        return 'status-borrador';
      case 'bloqueado':
        return 'status-bloqueado';
      case 'oculto':
        return 'status-oculto';
      default:
        return 'status-default';
    }
  }

  public statusIcon(status?: string) {
    switch ((status || '').toLowerCase()) {
      case 'borrador':
        return 'pi pi-pen-to-square';
      case 'bloqueado':
        return 'pi pi-lock';
      case 'oculto':
        return 'pi pi-eye-slash';
      default:
        return 'pi pi-circle';
    }
  }

  ngOnInit() {
    this.getSessions();
  }

  public getSessions() {
    this.filters.month = this._formatMonth(this.month);
    this.calendarSvc
      .getSessions(this.filters)
      .subscribe({ next: (sessions) => (this.sessions = sessions) });
  }

  private _formatMonth(date: Date) {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  public prevMonth() {
    const d = new Date(this.month);
    d.setMonth(d.getMonth() - 1);
    this.month = d;
    this.getSessions();
  }

  public nextMonth() {
    const d = new Date(this.month);
    d.setMonth(d.getMonth() + 1);
    this.month = d;
    this.getSessions();
  }

  public daysGrid(): Date[] {
    const year = this.month.getFullYear();
    const month = this.month.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    // compute offset from Monday (0..6)
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday -> 0
    const firstShown = new Date(year, month, 1 - startOffset);

    const lastOfMonth = new Date(year, month + 1, 0);

    const days: Date[] = [];
    for (let d = new Date(firstShown); d <= lastOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }

  public addSession() {}

  public openCreateModal(session?: SessionItem) {
    const ref = this.dialog.open(SessionCreateModal, {
      header: 'Nueva sesión',
      closable: true,
      data: {
        session,
      },
    });

    if (ref && ref.onClose && ref.onClose.subscribe) {
      ref.onClose.subscribe((created: SessionItem | undefined) => {
        if (created) this.getSessions();
      });
    }
  }

  public sessionsForDate(isoDate: string): SessionItem[] {
    return this.sessions.filter((s) => s.date.slice(0, 10) === isoDate);
  }
}
