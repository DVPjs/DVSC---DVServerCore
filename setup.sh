#!/bin/bash

# === DVSC SETUP SCRIPT ===
# Assumes you're already inside the DVSC repo directory

# Generate a 12-digit alphanumeric random password
SECRET=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 12)

# Create .env.local with the generated secret
echo "DVS_WEBHOOK_SECRET=$SECRET" > .env.local

# Display the secret to the user
echo -e "\n✅ Generated .env.local with secret:"
echo "DVS_WEBHOOK_SECRET=$SECRET"
echo

# Set executable permissions on this script (optional if already done)
chmod +x setup.sh

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Start the daemon
echo -e "\n🚀 Starting the DVSC daemon..."
npm run dev

# Final instructions
echo -e "\n🔧 You must manually configure domain whitelisting:"
echo "Edit: /home/$(whoami)/studio/src/config.ts"
echo
echo "Example:"
echo 'export const allowedOrigins: string[] = ['
echo "  'https://your-frontend-domain.com'"
echo '];'
echo

echo "✅ Want to whitelist or blacklist commands?"
echo "- Open src/utils/filter.ts or similar"
echo "- Add command names under:"
echo "    export const commandBlacklist = ['exampleCommand']"
echo "    export const commandWhitelist = ['safeCommand']"
