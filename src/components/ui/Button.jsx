/**
 * Button Component
 * Props:
 * text - text shown on button
 * onClick - click handler
 * disabled - disable button
 */

function Button({ text, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 14px",
        border: "none",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: disabled ? "#ccc" : "#2e7d32",
        color: "white",
        fontWeight: "bold"
      }}
    >
      {text}
    </button>
  );
}

export default Button;