import React, { createContext, useContext, useState, ReactNode } from "react";
import { Account } from "../types/account";

type AtmContextValue = {
  user: Account | null;
  isInput: boolean;
  input: string;
  pinAccepted: boolean;
  error: string;
  step: number;
  setUser: (u: Account | null) => void;
  setPinAccepted: (b: boolean) => void;
  showInput: () => void;
  hideInput: () => void;
  setError: (e: string) => void;
  setStep: (n: number) => void;
  onChangeInput: (s: string) => void;
};

const AtmContext = createContext<AtmContextValue | undefined>(undefined);

export const AtmProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Account | null>(null);
  const [pinAccepted, setPinAccepted] = useState(false);
  const [input, setInput] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);

  const showInput = () => {
    setIsInput(true);
  };

  const hideInput = () => {
    setIsInput(false);
    setInput("");
    setError("");
  };

  const onChangeInput = (s: string) => {
    if (error) {
      setError("");
    }
    setInput(s);
  };

  const value: AtmContextValue = {
    user,
    isInput,
    input,
    pinAccepted,
    error,
    step,
    setUser,
    setPinAccepted,
    showInput,
    hideInput,
    setError,
    setStep,
    onChangeInput,
  };
  return <AtmContext.Provider value={value}>{children}</AtmContext.Provider>;
};
export const atmProvider = AtmProvider;
export function useAtm() {
  const ctx = useContext(AtmContext);
  if (!ctx) throw new Error("useAtm must be used within AtmProvider");
  return ctx;
}
