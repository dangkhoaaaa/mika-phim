export const formatSlugToTitle = (slug: string | string[] | undefined): string => {
  if (!slug) return '';
  const value = Array.isArray(slug) ? slug[0] : slug;
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

