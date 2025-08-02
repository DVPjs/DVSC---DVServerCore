export function verifyPassword(password: string): boolean {
  const webhookPassword = process.env.WEBHOOK_PASSWORD;

  if (!webhookPassword) {
    console.error("CRITICAL: WEBHOOK_PASSWORD is not set in environment variables.");
    // In a real application, you might want to fail-safe and always return false.
    return false;
  }
  
  if (!password) {
    return false;
  }

  // IMPORTANT: In a production environment, use a constant-time comparison
  // function to prevent timing attacks. For this example, a simple comparison is used.
  // Example using a library like `scrypt`:
  // import { timingSafeEqual } from 'crypto';
  // const a = Buffer.from(password);
  // const b = Buffer.from(webhookPassword);
  // return a.length === b.length && timingSafeEqual(a, b);

  return password === webhookPassword;
}
