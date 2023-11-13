function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => {
        return <option value={option.value}>{option.name}</option>;
      })}
    </select>
  );
}

export default MySelect;