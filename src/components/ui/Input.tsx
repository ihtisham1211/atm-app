import React, { forwardRef } from "react";

export type InputProps<V extends string | number = string> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size"
> & {
  id?: string;
  label?: string;
  error?: string | null;
  value?: V;
  onChange?: (value: V) => void;
};

function InnerInput<V extends string | number = string>(
  props: InputProps<V>,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    id,
    label,
    error,
    className = "",
    value,
    onChange,
    type = "text",
    ...rest
  } = props;

  const idAttr = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
  const inputClass = [
    "block w-full px-3 text-base text-black",
    "bg-white border border-gray-700 placeholder-gray-400",
    className,
  ].join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    if (type === "number") {
      // keep empty string as-is to allow clearing the field
      const raw = e.target.value;
      const parsed =
        raw === "" ? ("" as unknown as V) : (Number(raw) as unknown as V);
      onChange(parsed);
    } else {
      onChange(e.target.value as unknown as V);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={idAttr} className="text-sm text-black">
          {label}
        </label>
      )}
      <input
        id={idAttr}
        ref={ref}
        className={inputClass}
        value={value}
        onChange={handleChange}
        type={type}
        {...rest}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

const Input = forwardRef(InnerInput) as <V extends string | number = string>(
  props: InputProps<V> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement | null;

(Input as any).displayName = "Input";

export default Input;
