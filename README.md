
# Jeremiah Coin Alerts — Version 1

This starter app tracks a public Solana wallet and shows recent transactions.

## What it does
- Paste a public Solana wallet address
- Pull recent transactions from Solana mainnet
- Refresh every 20 seconds
- Browser notification for new transactions
- Open each transaction on Solscan
- No seed phrase or private key required

## Run
1. Install Node.js 18+
2. In this folder run:
   npm install
   npm start
3. Open http://localhost:3000

## Optional
Set your own RPC endpoint:
SOLANA_RPC=https://your-rpc.example npm start

## Next version
- Decode swaps into BUY / SELL
- Token symbol and amount
- USD value
- Wallet labels
- Minimum trade filter
- Multiple wallets
