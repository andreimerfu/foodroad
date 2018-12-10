import React from 'react';
import { Line, Circle } from 'rc-progress';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class RestaurantHome extends React.Component {

  constructor() {
    super();
    this.state = {
      percent: 0,
      color: "#428bca"
    };
    this.checkCuiAction = this.checkCuiAction.bind(this);
  }

  getRestaurantInfo(manager_id) {
    this.props.dispatch(actions.getRestaurantInfoByManager(manager_id));
  }

  checkCuiAction(e) {
    if (e) {
      this.props.dispatch(actions.checkCuiAction(this.props.restaurant.id));
    }
  }

  renderVerifiedStatus(status) {
    if (status == true) {
      return (
        <span class="badge badge-success float-right">Verified</span>
      )
    } else {
      return (
        <span class="badge badge-warning float-right">Pending</span>
      )
    }
  }

  componentWillMount() {
    this.props.dispatch(actions.getUserProfile()).then(
      data => this.getRestaurantInfo(this.props.profile.id)
    );
  }

  render() {
    const restaurant = this.props.restaurant.attributes;
    if (restaurant && Object.keys(restaurant).length > 0) {
      return(
        <div style={{ margin: "auto", width: 400, "margin-top": "100px"}}>
         <CircularProgressbar
            percentage={restaurant.progress_value}
            text={(restaurant.progress_value) + " %"}
            initialAnimation="true"
          />
          <div className="d-flex justify-content-between">
            <p>Step 1. Check CUI </p>
          </div>
          { this.renderVerifiedStatus(restaurant.validation_steps['cui'])}
          <button className="btn btn-primary" onClick={this.checkCuiAction}>Check CUI </button>
            <p>Step 2. Add documents </p>
            { this.renderVerifiedStatus(restaurant.validation_steps['documents'])}
            <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile04"/>
            <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
          </div>
         <p>Step 3. Add restaurant info </p>
         { this.renderVerifiedStatus(restaurant.validation_steps['informations'])}
         <button className="btn btn-primary">Complete Information</button>

         <p>Step 4. Add restaurant menu </p>
         { this.renderVerifiedStatus(restaurant.validation_steps['menu'])}

         <button className="btn btn-primary">Complete Menu</button>
        </div>
      )
    } else {
      return (
        <p> Loading... </p>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    profile: state.userProfile.data,
    restaurant: state.restaurant.data
  }
}

export default connect(mapStateToProps)(RestaurantHome)
