#!/bin/bash

# Make the script executable
chmod +x "$0"

# Clone repo and enter
git clone https://github.com/YOUR_USERNAME/DVSC.git
cd DVSC || exit 1

# Generate random 12-character password
SECRET=$(openssl rand -base64 18 | tr -dc 'A-Za-z0-9' | head -c12)

# Create .env.local
echo "DVS_WEBHOOK_SECRET=$SECRET" > .env.local

# Install dependencies
npm install

# Start daemon
npm run dev &

# Output setup info
echo ""
echo "✅ Setup complete!"
echo "🔐 Your DVS_WEBHOOK_SECRET is: $SECRET"
echo ""
echo "🛠️ IMPORTANT:"
echo "Edit /home/user/studio/src/config.ts to add your domain(s) like this:"
echo ""
cat << 'EOF'
/**
 * Configuration for domain whitelisting (CORS).
 * Add the domains that are allowed to make requests to this server.
 */
export const allowedOrigins: string[] = [
  'https://yourdomain.com'
];
EOF
echo ""
echo "🛡️ To control command permissions, edit the allow/deny lists inside DVSC source:"
echo " - You can implement either a 'whitelist' or 'blacklist' for incoming command requests."
echo ""
