import React from 'react';  
import {connect} from 'react-redux';  
import history from '../../history';

export default function requireRestaurantLogin(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      //const {isAuth} = this.props.auth
      const role = localStorage.getItem('role');
      if (!this.props.auth.isAuth || role !== 'restaurant') {
        console.log('You need to login as a restaurant to see this page!');
        history.push('/login');
    }
}
   

    componentWillUpdate(nextProps) {
      const role = localStorage.getItem('role');
      if(!nextProps.auth.isAuth || role !== 'restaurant') {
        history.push('/login');
      }
    }
    render() {
      return (
        <div>
          {this.props.auth.isAuth === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}