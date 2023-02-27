import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = (props: InputProps) => {
  const { label, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
};

export default Input;
