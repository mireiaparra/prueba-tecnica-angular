import { sessionMonthFromIso, matchesMonthIso, matchesCategoryValue, matchesStatusValue } from './calendar.helpers';

describe('calendar.helpers', () => {
  it('sessionMonthFromIso returns formatted month and year', () => {
    const v = sessionMonthFromIso('2025-12-24T10:00:00');
    expect(v).toContain('2025');
  });

  it('matchesMonthIso matches correctly', () => {
    const m = sessionMonthFromIso('2025-12-01T00:00:00');
    expect(matchesMonthIso('2025-12-15T12:00:00', m)).toBeTrue();
  });

  it('matchesCategoryValue returns true for empty categories', () => {
    expect(matchesCategoryValue('tech', [])).toBeTrue();
  });

  it('matchesCategoryValue matches values', () => {
    expect(matchesCategoryValue('tech', ['tech', 'biz'])).toBeTrue();
    expect(matchesCategoryValue('other', ['tech'])).toBeFalse();
  });

  it('matchesStatusValue works similarly', () => {
    expect(matchesStatusValue('published', [])).toBeTrue();
    expect(matchesStatusValue('draft', ['draft'])).toBeTrue();
    expect(matchesStatusValue('archived', ['published'])).toBeFalse();
  });
});
