import React, { memo, useCallback, useMemo } from "react";
import LabelBar from "./LabelBar";
import { useAtm } from "../../context/atmContext";
import Input from "../ui/Input";
import {
  enterPin,
  leftPanel,
  rightPanel,
  stepType,
} from "../../utils/constants";
import useAtmAction from "../../utils/hook/useAtmAction";
import { STEP_ACTION_TYPE, STEP_TYPE } from "../../types/account";
import Button from "../ui/Button";

const ActionViewer: React.FC = () => {
  const {
    pinAccepted,
    user,
    isInput,
    onChangeInput,
    input,
    error,
    step,
    hideInput,
    setStep,
  } = useAtm();
  const { verifyPin, withdraw, deposit } = useAtmAction();

  const doneDisabled = useMemo(
    () => !input || String(input).trim().length === 0,
    [input]
  );

  const handleDone = useCallback(() => {
    if (!pinAccepted) {
      verifyPin();
      return;
    }
    switch (step) {
      case STEP_ACTION_TYPE.Re_Enter_Pin:
        verifyPin();
        break;
      case STEP_ACTION_TYPE.Withdraw:
        withdraw();
        break;
      case STEP_ACTION_TYPE.Deposit:
        deposit();
        break;
      default:
        break;
    }
  }, [pinAccepted, step, verifyPin, withdraw, deposit]);

  const handleBalanceBack = useCallback(() => {
    setStep(STEP_ACTION_TYPE.Pin);
  }, [setStep]);

  if (step === STEP_TYPE.Balance) {
    return (
      <div className="px-4 my-auto text-white">
        <p>
          Current balance: <b>${user?.balance}</b>
        </p>
        <Button onClick={handleBalanceBack} className="p-1 mt-2">
          Back
        </Button>
      </div>
    );
  }

  if (isInput) {
    return (
      <div className="px-4 my-auto">
        <Input<string>
          value={input}
          placeholder={`Enter ${stepType[step]}!`}
          onChange={onChangeInput}
          type="number"
          error={error}
          maxLength={8}
        />
        <div className="flex items-center gap-2">
          <Button
            disabled={doneDisabled}
            onClick={handleDone}
            className="p-1 mt-2"
          >
            Done
          </Button>
          <Button onClick={hideInput} className="p-1 mt-2">
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mt-auto align-bottom w-full">
      {pinAccepted && (
        <LabelBar
          direction={"right"}
          options={rightPanel}
          className="mt-auto"
        />
      )}
      <LabelBar
        direction={"left"}
        options={pinAccepted ? leftPanel : enterPin}
        className="mt-auto ml-auto"
      />
    </div>
  );
};

export default memo(ActionViewer);
