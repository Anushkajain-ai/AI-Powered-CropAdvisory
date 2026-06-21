/**
 * Modal Component
 * Props:
 * isOpen - show/hide modal
 * onClose - close handler
 * children - modal content
 */

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

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
        alignItems: "center"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;