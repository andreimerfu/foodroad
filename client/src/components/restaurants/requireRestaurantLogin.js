import React from 'react';  
import {connect} from 'react-redux';  
import history from '../../history';

export default function requireRestaurantLogin(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      //const {isAuth} = this.props.auth
      if (!this.props.auth.isAuth) {

       // console.log(isAuth);
        console.log('You need to login as a restaurant to see this page!');
        history.push('/login');
      }
    }
   
    componentWillUpdate(nextProps) {
      if(!nextProps.auth.isAuth) {
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
   // token: state.auth.token,
   // userName: state.auth.userName,
    auth: state.auth
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}