import React from 'react';  
import {connect} from 'react-redux';  
import history from '../../../history';

export default function requireLogin(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      const role = localStorage.getItem('role');
      if (!this.props.auth.isAuth || (role !== 'user' && role !== 'restaurant')) {
        console.log('You need to login as a restaurant to see this page!');
        history.push('/login');
      }
}
   

    componentDidUpdate(prevProps) {
      const role = localStorage.getItem('role');
      if(!prevProps.auth.isAuth || (role !== 'user' && role !== 'restaurant')) {
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