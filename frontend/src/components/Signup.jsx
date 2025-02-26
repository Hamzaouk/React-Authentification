import React, { useState } from "react";
import { Facebook, Mail } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [touchedFields, setTouchedFields] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
    
    if (invalidFields.includes(name)) {
      setInvalidFields(invalidFields.filter(field => field !== name));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setInvalidFields(prev => prev.includes(name) ? prev : [...prev, name]);
    } else {
      setInvalidFields(prev => prev.filter(field => field !== name));
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    const invalidFields = [];
    let isValid = true;
    
    const fieldsToValidate = {...formData};
    delete fieldsToValidate.termsAccepted;
    
    Object.entries(fieldsToValidate).forEach(([fieldName, value]) => {
      if (!value || value.trim() === '') {
        errors[fieldName] = `${fieldName} is required`;
        invalidFields.push(fieldName);
        isValid = false;
      }
    });
    
    return {
      isValid,
      errors,
      invalidFields
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allFieldNames = Object.keys(formData).filter(key => key !== 'termsAccepted');
    setTouchedFields(allFieldNames);
    
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setError("Please fill in all required fields");
      setInvalidFields(validation.invalidFields);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setInvalidFields([...invalidFields, "password", "confirmPassword"]);
      return;
    }
    
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions!");
      return;
    }
    
    setError("");
    setInvalidFields([]);
    console.log("Form Submitted", formData);
  };

  const getBorderClass = (fieldName) => {
    if (!touchedFields.includes(fieldName)) return "border-gray-300";
    return invalidFields.includes(fieldName) ? "border-red-500" : "border-green-500";
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600 mb-2">Signup</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className={`flex items-center py-2 px-3 rounded-md border-2 ${getBorderClass("username")}`}>
            <input className="pl-2 outline-none border-none w-full" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <div className={`flex items-center py-2 px-3 rounded-md border-2 gap-2 ${getBorderClass("email")}`}>
            <Mail className="text-gray-400" />
            <input className="pl-2 outline-none border-none w-full" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <div className={`flex items-center py-2 px-3 rounded-md border-2 ${getBorderClass("password")}`}>
            <input className="pl-2 outline-none border-none w-full" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <div className={`flex items-center py-2 px-3 rounded-md border-2 ${getBorderClass("confirmPassword")}`}>
            <input className="pl-2 outline-none border-none w-full" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
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
          <button type="button" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
            <Facebook className="mr-2" /> Facebook
          </button>
          <button type="button" className="flex items-center bg-gray-100 text-black px-4 py-2 rounded-md">
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
