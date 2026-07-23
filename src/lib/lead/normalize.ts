/**
 * Input normalization utilities for lead form data.
 * Applied before validation and payload construction.
 */

/** Remove excessive whitespace and trim */
export function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

/** Normalize email: trim, lowercase */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/** Normalize phone: keep only valid international phone characters */
export function normalizePhone(value: string): string {
  if (!value) return "";
  return value.trim().replace(/[^\d+\s\-().]/g, "");
}

/** Strip empty optional fields to keep payload compact */
export function stripEmptyOptionals<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const val = obj[key];
    if (val !== undefined && val !== null && val !== "") {
      result[key] = val;
    }
  }
  return result;
}
