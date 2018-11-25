import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

class UserProfile extends React.Component {

  constructor() {
    super()
  }
  componentWillMount() {
    var uid =  localStorage.getItem('upk')
    this.props.dispatch(actions.getUserProfile());
  }

  render() {
    const profile = this.props.profile;
    if ( Object.keys(profile).length > 0 ){
      return (
        <p>{ profile.attributes.role }</p>
      )
    } else {
      return (
        <p> Loading ... </p>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    profile: state.userProfile.data
  }
}

export default connect(mapStateToProps)(UserProfile)
