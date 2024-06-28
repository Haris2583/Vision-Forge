import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

const CareerResult = () => {
  const location = useLocation();
  const { recommendedCourses } = location.state || {};

  return (
    <div>
      <Helmet>
        <title>Career Results</title>
      </Helmet>
      <nav className="navbar">
        <ul>
          <div className='navlogo'>
            <img src="vg.png" alt="Logo" />
          </div>
          <li className="navlink"><a href="/user-profile">User</a></li>
         <NavLink to={'/login'}><li className="navlink"><a href="/logout">Logout</a></li> </NavLink> 
        </ul>
      </nav>
      <div className="resultdiv">
        <div className="label">
          <h1>Your Career Test Results</h1>
          <h2>Following are the List Of Careers That Are Suitable For You</h2>
        </div>
        <div className="fields">
          {recommendedCourses && recommendedCourses.length > 0 ? (
            recommendedCourses.map((course, index) => (
              <div className="career" key={index}>
                <div className="careerimg">
                  <img src='EE.jpg' alt="Error" />
                </div>
                <h4>{course}</h4>
              </div>
            ))
          ) : (
            <p>No recommended courses found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerResult;
