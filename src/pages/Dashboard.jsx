import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        color: "black"
      }}
    >
      <h1>Dashboard</h1>

      <h2>
        Welcome {user?.name}
      </h2>

      <p>You are successfully logged in.</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;