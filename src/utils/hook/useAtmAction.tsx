import { findByPin, updateBalance } from "../../services/AccountStore";
import { useAtm } from "../../context/atmContext";

const useAtmAction = () => {
  const { input, user, setError, setUser, setPinAccepted, hideInput } =
    useAtm();

  const verifyPin = async () => {
    const user = await findByPin(input);
    if (!user) {
      setError("No user found by PIN");
      return;
    }
    setPinAccepted(true);
    setUser(user);
    hideInput();
  };

  const exit = () => {
    setUser(null);
    setPinAccepted(false);
  };

  const withdraw = async () => {
    if (user?.id) {
      const newBalance = (user?.balance || 0) - Number(input);
      if (newBalance < 0) {
        setError(`Account doesn't have $${input}`);
        return;
      }
      const updatedDetails = await updateBalance(user.id, newBalance);
      updatedDetails && setUser(updatedDetails);
      hideInput();
    }
  };

  const deposit = async () => {
    if (user?.id) {
      const newBalance = (user?.balance || 0) + Number(input);
      const updatedDetails = await updateBalance(user.id, newBalance);
      updatedDetails && setUser(updatedDetails);
      hideInput();
    }
  };

  return { verifyPin, exit, withdraw, deposit };
};

export default useAtmAction;
