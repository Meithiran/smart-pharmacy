import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Pharmacy</h2>

      <ul className="space-y-4">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        
         {localStorage.getItem("role") === "admin" && (
    <Link to="/admin">Admin</Link>
  )}
      </ul>
    </div>
  );
}

export default Sidebar;