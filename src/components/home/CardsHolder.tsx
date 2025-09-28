import { useAtm } from "../../context/atmContext";
import { FRAMES } from "../../utils/constants";

const SPRITE_URL = "/assets/creditcard_sprite.png";
const SPRITE = {
  spriteWidth: 237,
  spriteHeight: 42,
  frameW: 40,
  frameH: 20,
  rowH: 21,
};

export const CardsHolder = () => {
  const { pinAccepted, user } = useAtm();
  const { spriteWidth, spriteHeight, frameW, frameH, rowH } = SPRITE;

  return (
    <div className="flex items-center gap-2">
      {FRAMES.map(({ id, x }) => {
        const selected = pinAccepted && user?.card === id;
        const bgY = selected ? 0 : rowH;
        const bgPos = `-${x}px -${bgY}px`;
        return (
          <span
            key={id}
            className={"relative overflow-hidden"}
            style={{
              width: frameW,
              height: frameH,
              backgroundImage: `url(${SPRITE_URL})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${spriteWidth}px ${spriteHeight}px`,
              backgroundPosition: bgPos,
            }}
          />
        );
      })}
    </div>
  );
};
