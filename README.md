# Casetext ATM Demo

A small React app that simulates a functional ATM with a stubbed backend (localStorage).

## Features
- Enter PIN to sign in
- View balance
- Withdraw and deposit funds
- Re-enter PIN, Exit
- Card network badge highlights for the signed-in account
- State persisted to `localStorage`

## Tech
- React + Vite
- React Hooks + Context for state
- Faux backend in `src/services/store.js`

## Run locally
```bash
# Node 18+ recommended
npm install
npm run dev
# open the printed localhost URL
```

If the images fail to load in your environment, ensure the assets exist in `src/assets/`.

### Test accounts
- **Peter Parker** — PIN: `1234` — Card: `visa` — Starting Balance: `$1,000.00`
- **Diana Prince** — PIN: `4321` — Card: `mastercard` — Starting Balance: `$2,500.50`

You can add more users by editing `src/data/accounts.json` (only used for first run seeding).

## Notes
- All transactions are done "server-side" via a small wrapper that reads/writes `localStorage`.
- This is purely a front-end demo per the assignment guidelines.
