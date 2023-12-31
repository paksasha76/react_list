import React, { FC } from "react";
import styles from "./MySelect.module.css";

interface Props {
  options: OptionItem[];
  defaultValue: string;
  value: string;
  onChange: Function;
}

interface OptionItem {
  name: string;
  value: string;
}

const MySelect: FC<Props> = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className={styles.mySelect}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(e.target.value)
      }
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option: OptionItem) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default MySelect;
