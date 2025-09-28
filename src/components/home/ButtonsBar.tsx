import Button from "../ui/Button";
interface ButtonsBarProps {
  size: number;
  direction: "left" | "right";
  onClick: (n: number) => void;
  className?: string;
  disabled: boolean;
}

const ButtonsBar = ({
  size,
  className,
  direction,
  onClick,
  disabled,
}: ButtonsBarProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      {Array.from({ length: Math.max(0, Math.floor(size)) }, (_, idx) => (
        <div
          key={idx}
          className={`flex items-center h-8 ${
            direction === "left" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <Button onClick={() => onClick(idx)} disabled={disabled} />
          <span className="w-4 h-1 bg-button" />
        </div>
      ))}
    </div>
  );
};

export default ButtonsBar;
