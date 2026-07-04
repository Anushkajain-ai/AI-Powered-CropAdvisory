function Modal({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
  onClick={(e) => e.stopPropagation()}
  style={{
    background: "white",
    color: "#222",
    padding: "24px",
    borderRadius: "12px",
    width: "92%",
    maxWidth: "900px",
    maxHeight: "85vh",
    overflowY: "auto",
    position: "relative",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  }}
>
        <button
          onClick={onClose}
          style={{
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px 10px",
  cursor: "pointer"
}}
        >
          ✕
        </button>

        <div style={{ marginTop: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;