# Verifiable Credential Verification with Affinidi (Next.js)

This is a [Next.js](https://nextjs.org) application that demonstrates Verifiable Credential (VC) verification using [Affinidi](https://www.affinidi.com).

## 🚀 Getting Started

### 1. Setup Environment Variables

Create a `.env` file by copying the provided example:

```bash
cp .env.example .env
```

Then update the environment variables such as PROJECT_ID, TOKEN_ID, etc. You can obtain these by creating a PST (Personal Access Token) in the [Affinidi Developer Portal](https://portal.affinidi.com).

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

- The Next.js frontend runs on port 3000.

- A WebSocket server runs on port 4000 to listen for and handle incoming VC responses.

## Run as a container

```
docker compose up -d
```
