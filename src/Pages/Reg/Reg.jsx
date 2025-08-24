import { useState } from "react";
import "./Reg.css"; 
import { useNavigate } from "react-router";

export function Reg() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", form["username"])
    localStorage.setItem("email", form["email"])
    localStorage.setItem("password", form["password"])
    console.log(localStorage.getItem("name"))
    
    navigate("/profile")
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create an account</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
