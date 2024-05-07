import React from "react";
import '../components/Dashboard.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
        <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Address: Hyderpora, Srinagar, Jammu and Kashmir</li>
              <li>Email: info@chinarquantumai.org</li>
              <li>Phone: +91 9906619248</li>
            </ul>
          </div>
          <div className="powered-by">
        <h6>Powered by CQAI Internship team</h6>
      </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
