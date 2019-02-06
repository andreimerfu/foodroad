
import React from 'react';
import { Link } from 'react-router-dom';

export class Footer extends React.Component  {

  render() {
    return (
      <footer class="main-footer shadow">
      <div class="container">
        <div class="col-lg-3 mb-5 mb-lg-0 pb-5">
            <div class="footer-logo">
              <img src="../images/logo.jpg" alt="..." class="img-fluid" width="30px" height="30px"></img>
              <h3></h3>
            </div>
        </div>
        <div class="row pt-5 justify-content-center text-right">
          <div class="col-lg-12 mb-5 mb-lg-0 text-right">
            <ul class="list-unstyled">
                <li> <Link to="/registerRestaurant" class="footer-link ">Inregistreaza un restaurant</Link></li>
                <li> <Link to="/" class="footer-link">Home</Link></li>
                <li> <Link to="/" class="footer-link">About</Link></li>
                <li> <Link to="/" class="footer-link">Contact</Link></li>
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





















