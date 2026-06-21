/**
 * Toast Component
 * Props:
 * message - toast text
 * onClose - auto close handler
 */

import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#333",
        color: "white",
        padding: "10px 15px",
        borderRadius: "6px"
      }}
    >
      {message}
    </div>
  );
}

export default Toast;