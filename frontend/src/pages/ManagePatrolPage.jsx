import { useState } from "react";
import axios from "axios";

export default function ManagePatrolPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    badgeId: "",
    vehicleNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/authority/create-patrol",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Patrol Created Successfully");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Create Patrol Officer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <input placeholder="Badge ID" onChange={(e)=>setForm({...form,badgeId:e.target.value})}/>
        <input placeholder="Vehicle Number" onChange={(e)=>setForm({...form,vehicleNumber:e.target.value})}/>
        <button type="submit">Create Patrol</button>
      </form>
    </div>
  );
}