import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
  localStorage.removeItem("role");  // clear old

  if (role === "admin") {
    navigate("register");   // 🔐 go login ONLY
  } else {
    localStorage.setItem("role", "user");
    navigate("/home");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome To Smart Pharmacy</h1>
      <h3>Select Role</h3>

      <button onClick={() => handleSelect("user")}>
        User
      </button>

      <button onClick={() => handleSelect("admin")}>
        Admin
      </button>
    </div>
  );
}

export default RoleSelect;