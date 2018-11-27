import React from 'react';
import { Line, Circle } from 'rc-progress';
import { connect } from 'react-redux';

class RestaurantHome extends React.Component {

  constructor() {
    super();
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
    const uid = localStorage.getItem('uid')
  }

  componentDidMount() {
    debugger;
    this.increase();
  }

  increase() {
    const percent = this.state.percent + 1;
    if (percent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  restart() {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  }


  render() {
    return(
      <div style={{ margin: "auto", width: 400, "text-align": "center", "margin-top": "100px"}}>
       <Circle percent={this.state.percent} strokeWidth="4" strokeColor="#428bca" />
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.data
    // categories: state.categories.data,
    // restaurant: state.restaurant.data,
    // products: state.products.data
  }
}

export default connect(mapStateToProps)(RestaurantHome)
