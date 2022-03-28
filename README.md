This is a [Next.js] TypeScript project bootstrapped with [`create-next-app`]

## Getting Started

First, install dependencies:
```bash
npm install
```

Create a .env.local file with your own Redis endpoint
You can get one for free that will work at [Redis.com](https://redis.com)
```bash
nvim .env.local
...
API_URL=redis://
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How It Works

Currently, it uses the [Solana Memo Program](https://spl.solana.com/memo), however it will work through a system of Spl-Tokens in the future. 
