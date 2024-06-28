import React from 'react'
import Footer from '../Project/Footer'
import {NavLink} from 'react-router-dom'


export default function () {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <div className='navlogo' >
                        <img src="vg.png" alt="" />
                    </div>
                    <li className="navlink"><a href="#home"></a>Home</li>
                    <li className="navlink"><a href="#about"></a>About</li>

                  <NavLink to={'/login'}> <li className="logout">Log Out</li></NavLink> 
                </ul>
            </nav>
            <div className="Homemaindiv">
                <div className="corner">
                    <div><img src="vg.png" alt="" /></div>
                    <label>VISION FORGE</label>
                </div>
                <div className="frontimg">
                    <img src="fig.png" alt="error" />

                </div>

            </div>

            <div className="buttons">
              <NavLink to={'/careerform'}>  <li className="select">Select Career</li></NavLink>
              <NavLink to={'/uform'}>   <li className="select">Select University</li></NavLink>
            </div>
          <Footer></Footer>

        </div>
    )
}