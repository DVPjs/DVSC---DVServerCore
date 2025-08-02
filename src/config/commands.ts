/**
 * Configuration for the webhook command whitelist.
 * Add any commands that you want to allow to be executed by the webhook.
 */
export const ALLOWED_COMMANDS = new Set([
  'ls -la',
  'whoami',
  // Add other safe commands here
]);
