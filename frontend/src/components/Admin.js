import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import API from "../services/api";
import "../styles/form.css";

function Admin() {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    patients: 0,
    medicines: 0,
    orders: 0,
    deliveries: 0
  });

  const [view, setView] = useState("dashboard"); 
  const [data, setData] = useState([]);
  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  useEffect(() => {
  const role = localStorage.getItem("role");

  // 🚫 Block non-admin
  if (role !== "admin") {
    navigate("/login");
  } else {
    fetchStats();
    setLoading(false);   // only admin can fetch
  }
}, [navigate]);
if (loading) return null;

  

  const loadData = async (type) => {
    setView(type);

    const res = await API.get(`/${type}`);
    setData(res.data);
  };

  return (
    <div className="admin">

      {/* 🔹 Dashboard View */}
      {view === "dashboard" && (
        <>
          <h1>⚙️ Admin Dashboard</h1>

          <div className="admin-cards">

            <div className="admin-card blue" onClick={() => loadData("patients")}>
              👥 Patients: {stats.patients}
            </div>

            <div className="admin-card green" onClick={() => loadData("medicines")}>
              💊 Medicines: {stats.medicines}
            </div>

            <div className="admin-card orange" onClick={() => loadData("orders")}>
              📦 Orders: {stats.orders}
            </div>

            <div className="admin-card purple" onClick={() => loadData("deliveries")}>
              🚚 Deliveries: {stats.deliveries}
            </div>

          </div>
        </>
      )}

      {/* 🔹 Data View */}
      {view !== "dashboard" && (
        <>
          <button onClick={() => setView("dashboard")}>⬅ Back</button>

          <h2>{view.toUpperCase()} LIST</h2>

          <table>
            <thead>
              <tr>
                {data[0] &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </div>
  );
}

export default Admin;