
import React from 'react';
import { Link } from 'react-router-dom';

export class Footer extends React.Component  {

  render() {
    return (
      <footer class="main-footer shadow">
      <div class="container">
        <div class="row pt-5 justify-content-center">
          <div class="col-lg-3 mb-5 mb-lg-0">
            <div class="footer-logo"><img src="../images/logo.jpg" alt="..." class="img-fluid"></img></div>
          </div>
          <div class="col-lg-3 mb-5 mb-lg-0 text-center text-sm-right">
            <h5 class="footer-heading">Site pages</h5>
            <ul class="list-unstyled">
              <li> <Link to="/registerRestaurant" class="footer-link">Become a partner restaurant</Link></li>

            </ul>
          </div>
          <div class="col-lg-3 mb-5 mb-lg-0 text-center text-sm-right">
            <h5 class="footer-heading">Resources</h5>
            <ul class="list-unstyled">
              <li> <a href="/" class="footer-link ">Home</a></li>
              <li> <a href="/" class="footer-link">About</a></li>
              <li> <a href="/" class="footer-link">Contact</a></li>
              <li> <a href="/" class="footer-link">Pricing</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="copyrights">
        <div class="container">
          <div class="row mb-1">
            <div class="col-lg-6 text-center text-lg-left">
              <p class="copyrights-text mb-3 mb-lg-0">&copy; All rights reserved. FoodRoad.co. </p>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
              <ul class="list-inline social mb-0">
                <li class="list-inline-item">
                  <a href="#" className="social-link"><i className="fab fa-facebook-square"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-youtube-square"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-google-plus-square"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
  }
}





















