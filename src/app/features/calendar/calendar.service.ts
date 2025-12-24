import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionItem } from '../../core/models/SessionItem.interface';

export interface SessionFilters {
  category?: string[];
  status?: string[];
  month: string;
}
@Injectable({ providedIn: 'root' })
export class CalendarService {
  private _http = inject(HttpClient);

  public getSessions(filters: SessionFilters): Observable<SessionItem[]> {
    return this._http.get<SessionItem[]>('/assets/mock/sessions.json').pipe(
      map((list) =>
        (list || []).filter((s) => {
          if (!this._matchesMonth(s, filters.month)) return false;
          if (!this._matchesCategory(s, filters.category)) return false;
          if (!this._matchesStatus(s, filters.status)) return false;
          return true;
        })
      ),
      catchError(() => of([]))
    );
  }

  private _sessionMonth(item: SessionItem): string {
    const iso = item.date;
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    return `${month} ${year}`;
  }

  private _matchesMonth(item: SessionItem, month: string): boolean {
    if (!month) return true;
    return this._sessionMonth(item) === month;
  }

  private _matchesCategory(item: SessionItem, categories?: string[] | null): boolean {
    if (!categories || !categories.length) return true;
    return categories.includes(item.category);
  }

  private _matchesStatus(item: SessionItem, statuses?: string[] | null): boolean {
    if (!statuses || !statuses.length) return true;
    return statuses.includes(item.status);
  }
}
