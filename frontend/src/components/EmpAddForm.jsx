import React, { useState } from 'react';
import axios from 'axios';

export default function EmpAddForm({isOpen,onClose}){
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        department: 'Engineering'
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const newErrors = {};
        
        // Validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setLoading(true);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/employees/', {
                Full_name: formData.fullName,
                Email: formData.email,
                Department: formData.department
            });
            setMessage('Employee created successfully!');
            setFormData({
                fullName: '',
                email: '',
                department: 'Engineering'
            });
            setTimeout(() => {
                onClose();
                setMessage('');
            }, 1500);
            console.log(response.data);
        }
        catch(error){
            if (error.response && error.response.status === 400) {
                const errorData = error.response.data;
                // Check if it's an email already used error
                if (errorData.Email) {
                    setErrors({ email: errorData.Email[0] || 'Email already in use' });
                    setMessage('');
                } else if (errorData.message) {
                    setMessage(errorData.message);
                } else {
                    setMessage('Email already in use or invalid data');
                }
            } else {
                setMessage('An error occurred while creating the employee.');
            }
        }
        finally{
            setLoading(false);
        }
        
    };
    
    return (
        <div className={`fixed inset-0 bg-[#111418]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="bg-white dark:bg-[#1a2432] w-full max-w-[480px] rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#dbe0e6] dark:border-[#2d394a] flex items-center justify-between bg-primary/5">
            <h3 className="font-bold text-lg">Add New Employee</h3>
            <button onClick={()=>onClose()} className="text-[#617289] hover:text-[#111418]"><span className="material-symbols-outlined">close</span></button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold block">Full Name</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full h-11 bg-[#f0f2f4] dark:bg-[#101822] border-2 rounded-lg text-sm px-4 focus:ring-2 focus:ring-primary/30 transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-transparent'
                }`} 
                placeholder="e.g. Michael Smith" 
                type="text" 
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold block">Email Address</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full h-11 bg-[#f0f2f4] dark:bg-[#101822] border-2 rounded-lg text-sm px-4 focus:ring-2 focus:ring-primary/30 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-transparent'
                }`} 
                placeholder="name@company.com" 
                type="email" 
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold block">Department</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full h-11 bg-[#f0f2f4] dark:bg-[#101822] border-none rounded-lg text-sm px-4 focus:ring-2 focus:ring-primary/30">
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Human Resources</option>
              </select>
            </div>
            {message && (
              <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <div className="pt-4 flex gap-3">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-primary text-white font-bold h-11 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors">
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
              <button 
                type="button"
                onClick={()=>onClose()} 
                className="px-6 h-11 rounded-lg font-bold bg-[#f0f2f4] dark:bg-[#2d394a] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}