# Knight's Legacy

## Overview
Knight's Legacy is an NFT-based game built on the NEAR blockchain where players can collect, train, and grow their own knights. Each knight is unique, and players can engage in battles, form alliances through marriage, and even pass on their legacy to the next generation.

## Features
- **Initial Knight Creation**: Automatically receive your first knight upon wallet connection.
- **Training**: Enhance your knight's skills through training.
- **Leveling Up**: Increase your knight's level to unlock new abilities and advantages.
- **Renaming**: Personalize your knight by giving them a custom name.
- **Marriage System**: Knights can marry other knights.
- **Offspring System**: Produce new knights through marriage.
- **Battle System**: Knights can battle each other for rewards and glory.
- **Marketplace**: Buy and sell knights within the ecosystem.

## Technology Stack
- **Blockchain**: NEAR Protocol
- **Smart Contracts**: Rust, Cargo
- **Backend**: Node.js, NestJS
- **Frontend**: Next.js, React.js

## Objectives
- Provide a fun and engaging collectible knight experience.
- Generate revenue for the project owner through in-game missions and marketplace transactions.
- Promote and support the NEAR ecosystem.


## Installation

### Prerequisites
- Node.js >= 20
- Cargo (Rust toolchain)
- NEAR CLI
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/knights-legacy.git
   cd knights-legacy
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Build smart contracts:
   ```bash
   cd ../contracts
   cargo build --target wasm32-unknown-unknown --release
   ```
5. Deploy contracts to NEAR testnet:
   ```bash
   near deploy --accountId your-account.testnet --wasmFile target/wasm32-unknown-unknown/release/knight-legacy.wasm
   ```
6. Start backend:
   ```bash
   cd ../backend
   npm run start:dev
   ```
7. Start frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

## Useful Links
- [NEAR Protocol](https://near.org/)
- [NEAR Documentation](https://docs.near.org/)
- [Rust Programming Language](https://www.rust-lang.org/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React.js Documentation](https://react.dev/)

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

🛡️ "Knight's Legacy — Where knights leave their immortal mark."
