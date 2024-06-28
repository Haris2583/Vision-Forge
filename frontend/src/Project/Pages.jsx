import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Project/Home';
import Login from './Login';
import Signup from './Signup';
import CareerForm from './CareerForm';
import CareerResult from './CareerResult';
import UForm from './UForm';


const Pages = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/careerform' element={<CareerForm/>}></Route>
            <Route path='/careerresult' element={<CareerResult/>}></Route>
            <Route path='/uform' element={<UForm/>}></Route>




        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Pages