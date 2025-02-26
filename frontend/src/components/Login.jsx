import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [validationError, setValidationError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [touchedFields, setTouchedFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    Object.entries(formData).forEach(([fieldName, value]) => {
      if (typeof value === 'boolean') return;
      
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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const allFieldNames = Object.keys(formData);
    setTouchedFields(allFieldNames);
    
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setValidationError("Please fill in all required fields");
      setInvalidFields(validation.invalidFields);
      return;
    }
    
    setValidationError("");
    setInvalidFields([]);
    console.log("Form submitted:", formData);
  };

  const getBorderClass = (fieldName) => {
    if (!touchedFields.includes(fieldName)) return "border-gray-300";
    return invalidFields.includes(fieldName) ? "border-red-500" : "border-green-500";
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
          
          {validationError && (
            <p className="text-red-500 text-sm text-center">{validationError}</p>
          )}
          
          <div className="flex items-center py-2 px-3 rounded-md gap-2 border-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input 
              className={`pl-2 outline-none w-full border-2 rounded-md ${getBorderClass("email")}`} 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email" 
            />
          </div>

          <div className="flex items-center py-2 px-3 rounded-md gap-2 border-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <input 
              className={`pl-2 outline-none w-full border-2 rounded-md ${getBorderClass("password")}`} 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password" 
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <label className="inline-flex items-center text-gray-700 font-medium text-xs cursor-pointer">
            <input type="checkbox" name="rememberMe" className="mr-2" />
            <span className="text-xs font-semibold">Remember me?</span>
          </label>
        </div>

        <button type="submit" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
          Login
        </button>

        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-700 font-medium text-xs">
            Don't have an account?
            <a href="/signup" className="text-blue-500 font-semibold ml-2">Register now &rarr;</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
