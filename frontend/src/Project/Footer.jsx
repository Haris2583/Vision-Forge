import React from 'react';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="vg.png" alt="Logo" className="footer-logo" />
          <address>
            <p className='bold'>Address: Avenue 1, Khayaban-E-Jinnah Road, Johar Town, Lahore, Punjab</p>
            <p><span className='bold'>Phone:</span> <a href="tel:+924235880007">(042) 35880007</a></p>
            <p><span className='bold'>Email:</span> <a href="mailto:Info@Ucp.Edu.Pk">Info@Ucp.Edu.Pk</a></p>
          </address>
        </div>
        <div className="footer-center">
          <nav>
            <ul className="footer-links">
              <li className='bold'>Useful Links</li>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#career">Career</a></li>
              <li><a href="#register">Register</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-right">
          <form className="subscribe-form">
            <input type="email" placeholder="Subscribe" className="subscribe-input" />
            <button type="submit" className="subscribe-button">➔</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
