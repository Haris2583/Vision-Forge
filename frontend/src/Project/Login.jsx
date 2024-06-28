import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const bgstyle = {
  backgroundColor: '#43679F',
  height: '1300px',
  width: '100%',
  top: '0px',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      console.log(response.data);

      if (response.data.status === "success") {
        toast.success('Login successful!', { autoClose: 2000 }); // Display success toast
        setTimeout(() => {
          navigate('/home');
        }, 2000); // Navigate to home after 2 seconds
      } else {
        toast.error(response.data.message); // Display error toast
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div style={bgstyle}>
      <div>
        <h3 className='loginheading'>LOGIN</h3>
      </div>
      <div className='formdiv'>
        <div className='logo'>
          <img src="vg.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputmain'>
            <div className='inputdiv'>
              <input
                type="text"
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
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
