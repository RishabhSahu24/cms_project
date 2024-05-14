import { RadioInputProps } from "../pages/types";

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
