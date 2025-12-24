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


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule, InputTextModule, CapitalizePipe, DynamicDialogModule],
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

  public daysInMonth(): Date[] {
    const date = new Date(this.month);
    const year = date.getFullYear();
    const month = date.getMonth();
    const days: Date[] = [];
    const total = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= total; d++) days.push(new Date(year, month, d));
    return days;
  }

  public addSession() {}

  public openCreateModal(session?: SessionItem) {
    const ref = this.dialog.open(SessionCreateModal, {
      header: 'Nueva sesión',
      closable: true,
      data: {
        session
      }
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
