# DVSCore Secure Management Panel

This is a Next.js application designed to act as a secure management panel for a server. It provides two core features:

1.  A real-time status page to monitor the health of a server daemon.
2.  A secure webhook endpoint that allows for remote execution of whitelisted shell commands.

## Features

-   **Status Page**: A simple, unstyled page that displays the live status of a mock server daemon, with status categories changing based on ping latency.
-   **Secure Webhook**: An API endpoint at `/api/webhook` that accepts `POST` requests to execute shell commands.
-   **Security**: The webhook is protected by a secret token and a command whitelist to prevent unauthorized or malicious use.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or another package manager

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```

### Configuration

1.  **Webhook Secret**: Create a `.env` file in the root of the project to store your secret webhook token. This token will be used to authenticate requests to the webhook.

    ```
    DVS_WEBHOOK_SECRET=your-super-secret-password
    ```

    Replace `your-super-secret-password` with a strong, unique secret.

2.  **Command Whitelist**: To enhance security, the webhook can only execute commands that are explicitly defined in a whitelist. You can manage this list in the following file:

    `src/config/commands.ts`

    By default, it allows `ls -la` and `whoami`. Add or remove commands as needed.

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Usage

### Status Page

Open your web browser and navigate to `http://localhost:9002`. You will see the live status of the server daemon.

### Testing the Webhook

You can test the webhook using a `curl` command. Make sure to use the correct `Authorization` header with the secret you defined in your `.env` file.

To execute a whitelisted command (e.g., `ls -la`):

```bash
curl -X POST \
  http://localhost:9002/api/webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-super-secret-password" \
  -d '{"command": "ls -la"}'
```

If the command is successful and whitelisted, you will receive a JSON response containing the standard output (`stdout`) and standard error (`stderr`) of the command.

If you try to run a command that is not on the whitelist, you will receive an error message.
