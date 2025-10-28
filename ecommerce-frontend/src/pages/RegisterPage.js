import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/register', form);
      alert('Registered! Now login.');
      navigate('/login');
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
      <button type="submit">Register</button>
    </form>
  );
}
