/**
 * Advanced slugify function with better handling
 */
export const toSlug = (title: string): string => {
  if (typeof title !== 'string' || !title.trim()) return '';

  return title
    .toLowerCase()
    .trim()
    // Replace common special characters
    .replace(/[\s_]+/g, '-')                    // Spaces and underscores → hyphen
    .replace(/[^a-z0-9-]/g, '')                 // Remove remaining special chars
    .replace(/-+/g, '-')                        // Multiple hyphens → single
    .replace(/^-+|-+$/g, '');                   // Trim hyphens from start/end
};