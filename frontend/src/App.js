import './App.css';
import "./styles/layout.css";
import { BrowserRouter, Routes, Route, Link,Navigate,useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PatientForm from "./components/PatientForm";
import MedicineForm from "./components/MedicineForm";
import OrderForm from "./components/OrderForm";
import DeliveryForm from "./components/DeliveryForm";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import RoleSelect from "./pages/RoleSelect";


function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
function Layout() {
  const location = useLocation();

  // 👉 hide sidebar only in role select page
  const hideSidebar = location.pathname === "/";

  return (
    <div className="app">

      {/* Sidebar */}
      {!hideSidebar && (
        <div className="sidebar">
          <h2>Pharmacy</h2>
          <Link to="/home">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/medicines">Medicines</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/delivery">Delivery</Link>

          {/* Admin only */}
          {localStorage.getItem("role") === "admin" && (
            <Link to="/admin">Admin</Link>
          )}
        </div>
      )}

      {/* Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patients" element={<PatientForm />} />
          <Route path="/medicines" element={<MedicineForm />} />
          <Route path="/orders" element={<OrderForm />} />
          <Route path="/delivery" element={<DeliveryForm />} />

          <Route
            path="/admin"
            element={
              localStorage.getItem("role") === "admin"
                ? <Admin />
                : <Navigate to="/login" />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;