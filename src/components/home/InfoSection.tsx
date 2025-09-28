import { memo, useMemo } from "react";
import { useAtm } from "../../context/atmContext";
import ActionViewer from "./ActionViewer";

const InfoSection = () => {
  const { pinAccepted, user } = useAtm();

  const isLoggedIn = !!(user && pinAccepted);
  const heading = useMemo(
    () => (
      <h3
        className={`font-semibold text-white text-center ${
          isLoggedIn ? "text-md" : "text-xl"
        } leading-none tracking-wide`}
      >
        {isLoggedIn ? (
          <>
            Hi {user?.name}!
            <br />
            Please make a choice...
          </>
        ) : (
          "Welcome to the ATM"
        )}
      </h3>
    ),
    [user?.name, isLoggedIn]
  );

  return (
    <div className="flex flex-col border-4 border-dark-light bg-screen pt-4 w-full relative">
      {heading}
      <img
        loading="lazy"
        src="/assets/systems.png"
        alt="hero-system"
        className="absolute right-0 -bottom-3.5"
      />
      <ActionViewer />
      <img
        src="/assets/sticker_graf.png"
        alt="hero-system"
        className="absolute -left-10 -bottom-26"
        loading="lazy"
      />
    </div>
  );
};

export default memo(InfoSection);
