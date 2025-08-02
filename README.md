# DVSC (Daemon Virtual Secure Core)

DVSC is the secure backend daemon built specifically for [DVPanel.com](https://dvpanel.com). It is designed to serve as the central backend control system for DVPanel, managing system-level functionality like file access, secret storage, terminal execution, and authenticated webhook communication — all while being intentionally headless and UI-free.

> ⚠️ Although DVSC is technically reusable for other web apps or control panels, please be aware:
> - Some features may feel missing or incomplete in standalone use.
> - Certain system hooks are designed to interact with DVPanel’s architecture and may be unnecessary or redundant elsewhere.
> - DVSC is not a plug-and-play solution — it is meant to be *extended* or *custom-integrated* by experienced developers.

### Key Features:
- **No frontend UI**: This app is completely headless — no visual pages, only API endpoints and secure daemons.
- **Next.js + JavaScript powered**: Built using Next.js (App Router) for modern, fast routing and server functionality.
- **Terminal access**: Secure, real-time access to the host machine's terminal via protected APIs.
- **File manager**: View, edit, and manipulate files using exposed endpoints (with full logging).
- **Configurable `.env.local`**: All secrets and runtime values stored in `.env.local`, including the `WEBHOOK_PASSWORD` for authentication.
- **Domain control**: Includes a `domain-config.js` file where you can define which origins are allowed to send/receive data.
- **Extensive logging**: Everything from API access to terminal sessions is logged for auditing and security.

---

### Example Use Case:
DVPanel uses DVSC to:
- Power its real-time terminal sessions from the web UI.
- Access and modify root server files without external dependencies.
- Authenticate trusted services via a webhook password.
- Maintain secure communication between panel instances and isolated environments.

---

### Getting Started:

```bash
git clone https://github.com/DVPjs/DVSC---DVServerCore.git
cd DVSC

# Edit .env.local and domain-config.js with your setup
npm install
npm run dev
```

---

### Contributing

Feel free to fork and build on top of DVSC to suit your own secure web-based system. Just note that it was designed primarily for DVPanel and not all features may be relevant outside that ecosystem.

---
© 2025 DVPanel.com
