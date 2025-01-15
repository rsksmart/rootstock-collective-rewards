# Rootstock Collective Rewards

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/rootstock-collective-rewards/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/ootstock-collective-rewards)
[![CodeQL](https://github.com/rsksmart/rskj/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/rootstock-collective-rewardsh/actions?query=workflow%3ACodeQL)

The Rootstock Collective Rewards Dapp enhances community engagement with token-gated experiences, granting exclusive access to premium content and rewards based on token ownership.

This approach ensures only qualified members can mint NFTs, access hidden content, or unlock rewards, creating a value-driven ecosystem that fosters loyalty and incentivizes participation. By leveraging blockchain and NFTs, the dapp empowers communities to deliver innovative, fair, and engaging experiences.

## Features

- Web3 Wallet Integration (Social login)
- JWT Session Management
- Token-Gated Content
- NFT Minting System

## Tech Stack

- Next.js 14
- TypeScript
- Thirdweb (sdk, auth, connection, UI)
- Tailwind CSS
- Shadcn/UI Components

## Contracts

Smart contracts are integrated via Thirdweb SDK:

- [stRIF](https://rootstock-testnet.blockscout.com/address/0xCacB5872A030d1a0Ca9267FA2AE87b4baE9D90fC)
- [Rootie NFT Contract](https://rootstock-testnet.blockscout.com/address/0x683AA67632c67d1Ff86FB475FC995E554E8E2AAd)
- [Legend NFT Contract](https://rootstock-testnet.blockscout.com/address/0xd013E82A3EE8882B011631F3C86c279559ab53bf)

## Project Structure

```
.
├── src
│   ├── app
│   │   ├── actions
│   │   │   ├── auth.ts         # Authentication actions
│   │   │   └── gate.ts         # Token gating logic
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── utils
│   │       ├── client.ts       # Thirdweb client setup
│   │       ├── consts.ts       # Global constants
│   │       └── thirdwebAuth.ts # Auth configuration
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoginButton.tsx
│   │   ├── mint-section.tsx
│   │   ├── token-progress.tsx
│   │   └── ui                  # Shadcn UI components
│   │       ├── alert.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── progress.tsx
│   │       └── sonner.tsx
│   └── lib
│       ├── error.ts
│       ├── hooks.ts
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Setup

### Prerequisites

- Node.js v18+
- Bun package manager
- MetaMask or compatible Web3 wallet
- Thirdweb account

### Environment Variables

```bash
# Thirdweb Configuration
# Required: Client ID from thirdweb dashboard
# Get it from: https://thirdweb.com/dashboard/
NEXT_PUBLIC_TEMPLATE_CLIENT_ID=your_client_id_here

# Required: Secret key for server-side operations
# Get it from: https://thirdweb.com/dashboard/
# WARNING: Never expose this in client-side code or commit to version control
THIRDWEB_SECRET_KEY=your_secret_key_here

# Required: Domain for authentication
# Format: hostname:port
# Use localhost:3000 for local development
# Use your actual domain in production (e.g., myapp.com)
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=localhost:3000

# Required: Private key of the admin wallet
# Get it from: Your wallet's export private key option
# WARNING: Keep this secure and never share or commit this
# Used for: Contract deployments, admin operations
THIRDWEB_ADMIN_PRIVATE_KEY=your_private_key_here
```

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

## Resources

- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Rootstock Documentation](https://developers.rsk.co/)
- [Rootstock Collective](https://rootstockcollective.xyz/)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.

## Disclaimer

The software provided in this GitHub repository is offered "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software's output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.