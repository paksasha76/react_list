import React from "react";

interface Props {
  options: OptionItem[];
  defaultValue: string;
  value: string;
  onChange: Function;
}

interface OptionItem  {
  name?: string;
  value?: string;
}

function MySelect({ options, defaultValue, value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option: OptionItem) => {
        console.log(option)
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default MySelect;
