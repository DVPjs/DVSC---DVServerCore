/**
 * Configuration for domain whitelisting (CORS).
 * Add the domains that are allowed to make requests to this server.
 *
 * @example
 * export const allowedOrigins: string[] = [
 *   'https://www.my-app.com',
 *   'https://my-app.vercel.app',
 * ];
 *
 * If you want to allow all origins in development, you can do this:
 * if (process.env.NODE_ENV === 'development') {
 *   allowedOrigins.push('http://localhost:3000'); // Or your local dev port
 * }
 */
export const allowedOrigins: string[] = [
  // Add production domains here
];
