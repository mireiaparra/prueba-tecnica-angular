import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { matchesMonthIso, matchesCategoryValue, matchesStatusValue } from './calendar.helpers';
import { SessionFilters, SessionItem } from '../../core/models/Session.interface';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private _http = inject(HttpClient);

  private _cache: SessionItem[] | null = null;

  private loadIfNeeded(): Observable<SessionItem[]> {
    if (this._cache) return of(this._cache);
    return this._http.get<SessionItem[]>('/assets/mock/sessions.json').pipe(
      map((list) => {
        this._cache = list || [];
        return this._cache;
      }),
      catchError(() => {
        this._cache = [];
        return of(this._cache);
      })
    );
  }

  public getSessions(filters: SessionFilters): Observable<SessionItem[]> {
    return this.loadIfNeeded().pipe(
      map((list) =>
        (list || []).filter((s) => {
          if (!matchesMonthIso(s.date, filters.month)) return false;
          if (!matchesCategoryValue(s.category, filters.category)) return false;
          if (!matchesStatusValue(s.status, filters.status)) return false;
          return true;
        })
      )
    );
  }

  public getById(id: string): Observable<SessionItem | undefined> {
    return this.loadIfNeeded().pipe(map((list) => (list || []).find((s) => s.id === id)));
  }

  public createSession(payload: Partial<SessionItem>): Observable<SessionItem> {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
    const item: SessionItem = {
      id,
      title: payload.title || 'Untitled',
      image: payload.image,
      description: payload.description,
      category: payload.category || 'general',
      city: payload.city,
      date: payload.date || new Date().toISOString(),
      status: payload.status || 'borrador',
    };
    if (!this._cache) {
      this._cache = [];
    } else {
      this._cache = [...this._cache, item];
    }
    return of(item);
  }

  public updateSession(
    id: string,
    payload: Partial<SessionItem>
  ): Observable<SessionItem | undefined> {
    if (!this._cache) return of(undefined);
    const idx = this._cache.findIndex((s) => s.id === id);
    if (idx === -1) return of(undefined);
    const updated = { ...this._cache[idx], ...payload } as SessionItem;
    this._cache[idx] = updated;
    return of(updated);
  }

  public deleteSession(id: string): Observable<boolean> {
    if (!this._cache) return of(false);
    const idx = this._cache.findIndex((s) => s.id === id);
    if (idx === -1) return of(false);
    this._cache.splice(idx, 1);
    return of(true);
  }
}
