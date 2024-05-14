import { ColorSelectProps } from "../pages/types";

const ColorSelect: React.FC<ColorSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="color"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Color
      </label>
      <select
        id="color"
        name="color"
        value={value}
        onChange={onChange}
        className="block w-full mt-1  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="">Select Color</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Yellow">Yellow</option>
        <option value="Brown">Brown</option>
        <option value="Grey">Grey</option>
        <option value="Indigo">Indigo</option>
      </select>
    </div>
  );
};

export default ColorSelect;
