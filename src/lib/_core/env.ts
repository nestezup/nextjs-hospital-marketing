/**
 * Environment variables configuration
 * Validates and exports typed environment variables
 */

// Forge API Configuration
export const ENV = {
  forgeApiUrl: process.env.FORGE_API_URL || '',
  forgeApiKey: process.env.FORGE_API_KEY || '',
  ownerEmail: process.env.OWNER_EMAIL || 'admin@example.com',
} as const;

// Validation (optional - can add runtime checks if needed)
if (typeof window === 'undefined') {
  // Server-side only validation
  if (!ENV.forgeApiUrl) {
    console.warn('[ENV] FORGE_API_URL is not set');
  }
  if (!ENV.forgeApiKey) {
    console.warn('[ENV] FORGE_API_KEY is not set');
  }
}
