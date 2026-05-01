import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login({ setRole }) {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Sending:", data);

    if (!data.username || !data.password) {
      alert("Enter username & password");
      return;
    }

    try {
      const res = await API.post("/login", {
        username: data.username,
        password: data.password
      });

      console.log("Response:", res.data);

      if (res.data.role === "admin") {
        localStorage.setItem("role", "admin");
        setRole && setRole("admin");
        navigate("/admin");
      } else {
        alert("Only admin allowed");
      }

    } catch (err) {
      console.error("ERROR:", err.response?.data);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        value={data.username}
        placeholder="Username"
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />

      <input
        value={data.password}
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;