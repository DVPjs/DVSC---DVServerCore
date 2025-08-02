# **App Name**: DVSCore

## Core Features:

- Request Logging: Log all incoming requests with detailed information such as method, IP, payload, and timestamp.
- Secure Terminal Access: Expose a terminal interface via WebSocket, secured with WEBHOOK_PASSWORD, for remote access and management.
- File Management API: Implement secure read, write, and list operations for files, including content editing, all authenticated via WEBHOOK_PASSWORD.
- Secure Configuration: Utilize a .env.local file for storing sensitive secrets and configuration values, protected against direct access.
- Domain Whitelisting: Implement a config.js file to define allowed domains for requests, enforcing a strict CORS policy.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey security and stability.
- Background color: Dark gray (#303030) to minimize distractions and enhance focus.
- Accent color: Light blue (#64B5F6) to highlight interactive elements and critical information.
- Font: 'Inter' (sans-serif) for a modern and neutral look, suitable for both headlines and system messages.