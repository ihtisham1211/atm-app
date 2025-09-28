export type Account = {
  id: string;
  name: string;
  pin: number;
  balance: number;
  card?: string;
};

export enum STEP_TYPE {
  Withdraw = 6,
  Deposit = 7,
  Exit = 1,
  Balance = 2,
  Re_Enter_Pin = 3,
  Pin = 3,
}

export enum STEP_ACTION_TYPE {
  Pin = 0,
  Re_Enter_Pin = 3,
  Withdraw = 6,
  Deposit = 7,
}

export type CardId =
  | "star"
  | "pulse"
  | "maestro"
  | "mastercard"
  | "plus"
  | "visa";
