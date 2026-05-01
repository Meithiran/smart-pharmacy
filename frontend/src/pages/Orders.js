import { useEffect, useState } from "react";
import API from "../services/api";
import StatusBadge from "../components/StatusBadge";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">ID</th>
            <th className="p-3">Patient</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <div className="form-group">
  

          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-3">{o.id}</td>
              <td className="p-3">{o.patient_id}</td>
              <td className="p-3">{o.priority}</td>
              <td className="p-3">
                <StatusBadge status={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;