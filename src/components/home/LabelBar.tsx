interface LabelBarProps {
  direction: "left" | "right";
  className?: string;
  options: string[];
}

const LabelBar = ({ className, direction, options }: LabelBarProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      {options.map((label, idx) => (
        <div
          key={label + idx}
          className={`flex items-center h-8 ${
            direction === "left"
              ? "flex-row self-end"
              : "flex-row-reverse self-start"
          }`}
        >
          <span className="text-white mx-1 text-base">{label}</span>
          <span className="w-4 h-1 bg-white" />
        </div>
      ))}
    </div>
  );
};

export default LabelBar;
