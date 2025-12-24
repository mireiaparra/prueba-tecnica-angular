export function sessionMonthFromIso(iso?: string, locale = 'default'): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const month = d.toLocaleString(locale, { month: 'long' });
  return `${month} ${d.getFullYear()}`;
}

export function matchesMonthIso(
  iso: string | undefined,
  month: string,
  locale = 'default'
): boolean {
  if (!month) return true;
  return sessionMonthFromIso(iso, locale) === month;
}

export function matchesCategoryValue(category?: string, categories?: string[] | null): boolean {
  if (!categories || !categories.length) return true;
  if (!category) return false;
  return categories.includes(category);
}

export function matchesStatusValue(status?: string, statuses?: string[] | null): boolean {
  if (!statuses || !statuses.length) return true;
  if (!status) return false;
  return statuses.includes(status);
}
