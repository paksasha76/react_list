import React from "react";

interface Props {
  options: {}[];
  defaultValue: string;
  value: string;
  onChange: (e: any) => {};
}

function MySelect({ options, defaultValue, value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option: any) => {
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
