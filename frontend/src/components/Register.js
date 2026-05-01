import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/register", data);

      console.log("Register response:", res.data);

      alert("Registered successfully");

      navigate("/login");   // ✅ go login after register

    } catch (err) {
  console.error("FULL ERROR:", err);
  console.error("BACKEND ERROR:", err.response?.data);
  alert("Register failed");
}
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={e => setData({ ...data, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;