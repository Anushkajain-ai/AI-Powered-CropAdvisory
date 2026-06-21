/**
 * Input Component
 * Props:
 * placeholder - input placeholder text
 * value - input value
 * onChange - change handler
 */

function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%",
        marginTop: "8px"
      }}
    />
  );
}

export default Input;