import React from 'react';
import { Line, Circle } from 'rc-progress';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RestaurantHome extends React.Component {

  constructor() {
    super();
    this.state = {
      percent: 0,
      color: "#428bca"
    };
    this.increase = this.increase.bind(this);
  }

  getRestaurantInfo(manager_id) {
    this.props.dispatch(actions.getRestaurantInfoByManager(manager_id));
  }

  componentWillMount() {
    this.props.dispatch(actions.getUserProfile()).then(
      data => this.getRestaurantInfo(this.props.profile.id)
    );
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const percent = this.state.percent + 1;
    //const percent = this.props.restaurant.attributes.progress_value;
    if (percent >= 100) {
      if (percent === 100) {
        this.setState({color: "#4caf50"})
      }
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  render() {
    const restaurant = this.props.restaurant.attributes;
    if (restaurant && Object.keys(restaurant).length > 0) {
      return(
        <div style={{ margin: "auto", width: 400, "margin-top": "100px"}}>
         <Circle percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color} />
          <p>Step 1. Check CUI </p>
          <button className="btn btn-primary">Check CUI</button>
            <p>Step 2. Add documents </p>
            <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile04"/>
            <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
          </div>
         <p>Step 3. Add restaurant info </p>
         <button className="btn btn-primary">Complete Information</button>

         <p>Step 4. Add restaurant menu </p>
         <button className="btn btn-primary">Complete Menu</button>
         <p> Progress value: {restaurant.progress_value} </p>
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
