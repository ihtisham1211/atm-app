import React, { useCallback, memo, useMemo } from "react";
import ButtonsBar from "./ButtonsBar";
import InfoSection from "./InfoSection";
import { useAtm } from "../../context/atmContext";
import { STEP_TYPE } from "../../types/account";
import useAtmAction from "../../utils/hook/useAtmAction";

const AtmScreen: React.FC = () => {
  const { pinAccepted, isInput, step, showInput, setStep } = useAtm();
  const { exit } = useAtmAction();

  const isDisabled = useMemo(
    () => isInput || step === STEP_TYPE.Balance,
    [isInput, step]
  );

  const onClickLeftBar = useCallback(
    (option: number) => {
      if (!pinAccepted) return;
      const newStep = option + 4;
      if (newStep === STEP_TYPE.Withdraw || newStep === STEP_TYPE.Deposit) {
        showInput();
      }
      setStep(newStep);
    },
    [pinAccepted, showInput, setStep]
  );

  const onClickRightBar = useCallback(
    (option: number) => {
      if (!pinAccepted) {
        if (option === STEP_TYPE.Pin) {
          showInput();
        }
        return;
      }
      if (option === STEP_TYPE.Exit) {
        exit();
        return;
      }
      if (option === STEP_TYPE.Re_Enter_Pin) {
        showInput();
      }
      setStep(option);
    },
    [pinAccepted, showInput, exit, setStep]
  );

  return (
    <div className="flex w-full my-3 relative">
      <ButtonsBar
        direction="left"
        size={4}
        className="mt-16 mb-1"
        onClick={onClickLeftBar}
        disabled={isDisabled}
      />
      <InfoSection />
      <ButtonsBar
        direction="right"
        size={4}
        className="mt-16 mb-1"
        onClick={onClickRightBar}
        disabled={isDisabled}
      />
    </div>
  );
};

export default memo(AtmScreen);
