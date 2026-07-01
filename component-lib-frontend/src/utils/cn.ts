/**
 * Joins class names; extend with clsx + tailwind-merge when you need deduping.
 */
export function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}
