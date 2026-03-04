import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Remove the language suffix (e.g. `.en`, `.pt`) from a content entry ID. */
export function stripLangSuffix(id: string): string {
  return id.replace(/\.(en|pt)$/, '');
}
