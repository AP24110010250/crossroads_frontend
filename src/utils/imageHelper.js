/**
 * Resolves the absolute URL of an image path.
 * Handles:
 * 1. Absolute URLs (http:// or https://) - returned as-is.
 * 2. Local public assets (starting with /placeholders, /images, /videos, /icons, etc.) - prefixes with Vite's BASE_URL (e.g., /crossroads_frontend/).
 * 3. Backend uploads (starting with /uploads/ or other non-frontend paths) - prefixes with VITE_API_URL (minus the /api suffix).
 *
 * @param {string} imagePath - The relative or absolute path of the image.
 * @returns {string} - The fully resolved URL.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Normalize path to check prefix (remove leading slash if present)
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // Check if it's a frontend public asset
  if (
    cleanPath.startsWith('placeholders/') ||
    cleanPath.startsWith('images/') ||
    cleanPath.startsWith('videos/') ||
    cleanPath.startsWith('favicon.svg') ||
    cleanPath.startsWith('icons/') ||
    cleanPath.startsWith('icons.svg')
  ) {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBaseUrl}${cleanPath}`;
  }

  // Otherwise, treat it as a backend asset (e.g., from the uploads folder)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBaseUrl}${cleanPath}`;
};
