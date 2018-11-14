import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class RestaurantMenu extends React.Component {

    constructor(props) {
    super(props);
  }

    componentWillMount() {
      const restaurantId = this.props.match.params.id;
      this.props.dispatch(actions.fetchRestaurantById(restaurantId));
    }
  render(){
    const restaurant = this.props.restaurant;
    if (restaurant.length > 0) {
        return(
          <section id='restaurant-menu'>
          <div className="wrapper">
            
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Nume Restaurant</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Oferte(daca exista)</p>
                    <li className="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Sugestii preparate</a>
                    </li>
                    <li>
                        <a href="#">Mic dejun</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Fel principal</a>
                    </li>
                    <li>
                        <a href="#">Desert</a>
                    </li>
                    <li>
                        <a href="#">Bauturi</a>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">
                    <li>
                        <a href="#" className="download">Recenzii</a>
                    </li>
                    <li>
                        <a href="#" className="article">Info</a>
                    </li>
                </ul>
              
            </nav>

        
            <div id="content">

                <nav className="nav-toggle navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                        {
                        // <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        //     <i className="fas fa-align-justify"></i>
                        // </button>

                        // <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        //     <ul className="nav navbar-nav ml-auto">
                        //         <li className="nav-item active">
                        //             <a className="nav-link" href="#">Page</a>
                        //         </li>
                        //         <li className="nav-item">
                        //             <a className="nav-link" href="#">Page</a>
                        //         </li>
                        //         <li className="nav-item">
                        //             <a className="nav-link" href="#">Page</a>
                        //         </li>
                        //         <li className="nav-item">
                        //             <a className="nav-link" href="#">Page</a>
                        //         </li>
                        //     </ul>
                          
                        //</div>
                      }
                    </div>
                </nav>

                <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h3>Lorem Ipsum Dolor</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        </section>
         )
    } else {
        return (
            <p> Loading </p>
            )
    }
  }
}

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.data
  }
}

export default connect(mapStateToProps)(RestaurantMenu)


// function mapStateToProps(state) {
//     debugger;
//   return {
//     restaurant: state.restaurant.data
//   }
// }

// export default connect(mapStateToProps)(RestaurantMenu)