import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';



const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password ) {
      toast.error('All fields are required!');
      return;
    }

    

    const data = { name, email, password };

    try {
      const response = await axios.post('http://localhost:8080/registration', data);
      console.log(response.data);
      toast.success('Registration successful!');

      // Delay before navigating to the next page
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Adjust the delay time as per your preference
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='bgstyle'>
      <div>
        <h3 className='loginheading'>SIGN UP</h3>
      </div>
      <div className='formdiv'>
        <div className='logo'>
          <img src="vg.png" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputmain'>
            <div className='inputdiv'>
              <input
                type="text"
                placeholder='Enter username'
                className='inputs'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='inputdiv'>
              <input
                type="email"
                placeholder='Enter your email'
                className='inputs'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='inputdiv'>
              <input
                type="password"
                placeholder='Enter your password'
                className='inputs'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
           
            <div className='inputdiv'>
              <button className='inputs1' type="submit">
                Sign Up </button>

            </div>


          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Signup