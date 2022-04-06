This is a [Next.js] TypeScript project bootstrapped with [`create-next-app`]

# For the latest version using Spl-Tokens / NFTs, see the spl-token-redis branch

The latest deployment can be viewed [here](https://meta-message-bcxq7js8l-azatvaliev.vercel.app)

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How It Works

This messaging app works on the Solana blockchain, through sending of NFTs. 
Every user's keypair is encrypted in localstorage, to ensure even if localstorage is compromised, the key will not be.

-----

### Setup

Bob and Alice both create accounts with Meta Message.
Their wallet addresses are as follows.

Bob - 3C3WRxARtXAeHEht5usyPFFRSX5gZSHDoBjBWwL3N8Sf
Alice - 38qxLjdQ2y3cyNcnGwoLu929xjXqT5esnT2uSksqJftn


### Keypair Security

Private keys needed to sign and send a message are secure with Bob and Alice, encrypted in local storage using their passwords that meet a minimum security requirement.


### Messaging

Bob wants to send a message to Alice, so he composes his message and enters the address 38qxLjdQ2y3cyNcnGwoLu929xjXqT5esnT2uSksqJftn as the recipient, since that is Alice's address.

Bob's address will then create and mint a unique NFT, let's say the mint ID is FxWPR8rsPPnq2mQJN9P8DsUcMUpSkCJDYHbMQEV51UV7DsUcMU. This NFT is then sent to Alice's address, and Bob will send a request to a Redis database to submit an key-value with his encrypted message as the value, and the mint ID as the key.

Alice will then recieve the NFT, and can verify that it came from Bob's address and derive the mint ID. Using the mint ID, Alice will access the database entry, and upon access the message in database will be destroyed or within 72 hours if not opened.


### Read Reciepts

Alice will then send the NFT back to Bob, and when Bob recieves an NFT back that he can see he is the original minter of & that is Alice is the one who sent it back, that is the signal that Alice has now read the message. 
