import React, { useState } from "react";
import { Facebook, Mail } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions!");
      return;
    }
    setError("");
    console.log("Form Submitted", formData);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600 mb-2">Signup</h1>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
            <input className="pl-2 outline-none border-none w-full" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-md">
            <input className="pl-2 outline-none border-none w-full" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-md">
            <input className="pl-2 outline-none border-none w-full" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="termsAccepted" className="mr-2" checked={formData.termsAccepted} onChange={handleChange} />
            <label className="text-gray-700 text-sm cursor-pointer">Accept Terms and Conditions</label>
          </div>

          <button type="submit" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
            Signup
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button type="button" onClick={() => console.log("Facebook login")} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
            <Facebook className="mr-2" /> Facebook
          </button>
          <button type="button" onClick={() => console.log("Gmail login")} className="flex items-center bg-gray-100 text-black px-4 py-2 rounded-md">
            <Mail className="mr-2 text-red-500" /> Gmail
          </button>
        </div>
        
        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-700 font-medium text-xs">
            Already have an account?
            <a href="/login" className="text-blue-500 font-semibold ml-2">Login &rarr;</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;