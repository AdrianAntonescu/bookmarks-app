// this is only used in bookmarks-list.component.ts, but I created this helper for potential future reuse
export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
