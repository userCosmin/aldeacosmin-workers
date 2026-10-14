const nf = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0, useGrouping: 'always' } as Intl.NumberFormatOptions);

export const formatNumber = (n: number) => nf.format(n);
/** Integers with Romanian thousands separator, also for 4-digit values (1.534). */
export const formatInt = (n: number) => nf0.format(Math.round(n));
export const formatKm = (n: number) => `${nf.format(n)} km`;
export const formatAscent = (n: number) => `+${formatInt(n)} m`;

export const plural = (n: number, one: string, many: string) => (n === 1 ? `${n} ${one}` : `${n} ${many}`);

const df = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (iso: string) => df.format(new Date(iso));
