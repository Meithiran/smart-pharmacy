import React, { useState } from "react";
import API from "../services/api";
import "../styles/form.css";

function OrderForm() {
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [items, setItems] = useState([
    { medicine_id: "", quantity: "" }
  ]);

  const addItem = () => {
    setItems([...items, { medicine_id: "", quantity: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("patient_id", patientId);
  formData.append("items", JSON.stringify(items));
  formData.append("file", file);

  try {
    const res = await API.post("/orders", formData);

    alert("Order Created"+res.data.message);
  } catch (err) {
    console.error(err);
    alert("Order failed");
  }
};

  return (
    <div className="page">
      <h2>Create Order</h2>

      {/* Patient ID */}
      <div className="form-group">
        <input
          className="input"
          placeholder="Patient ID"
          onChange={e => setPatientId(e.target.value)}
        />
      </div>
      {/* Prescription Upload */}
<div className="form-group">
  <label>Upload Prescription</label>
  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
  />
</div>

      {/* Items */}
      <div className="items-section">
        {items.map((item, index) => (
          <div className="item-row" key={index}>
            <input
              className="input"
              placeholder="Medicine ID"
              onChange={e =>
                handleItemChange(index, "medicine_id", e.target.value)
              }
            />

            <input
              className="input"
              placeholder="Quantity"
              onChange={e =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="btn-group">
        <button className="btn secondary" onClick={addItem}>
          + Add Item
        </button>

        <button className="btn" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default OrderForm;