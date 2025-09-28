# ATM Demo

A small React app that simulates a functional ATM.

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

## Run locally

```bash
# Node 18+ recommended
npm install
npm run dev
# open the printed localhost URL
```

If the images fail to load in your environment, ensure the assets exist in `public/assets/`.

### Test accounts

- **Peter Parker** — PIN: `1234` — Card: `plus` — Starting Balance: `$1,000.00`

You can add more users by editing `src/utils/constants.ts`

## Notes

- This is purely a front-end demo per the assignment guidelines.
