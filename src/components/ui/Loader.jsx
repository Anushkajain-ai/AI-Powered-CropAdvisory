/**
 * Loader Component
 * Props:
 * text - loading message
 */

function Loader({ text = "Loading..." }) {
  return (
    <div style={{ marginTop: "10px", fontWeight: "bold", color: "#555" }}>
      ⏳ {text}
    </div>
  );
}

export default Loader;