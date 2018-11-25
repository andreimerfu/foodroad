import React from 'react';
import { Line, Circle } from 'rc-progress';

class RestaurantHome extends React.Component {

  constructor() {
    super();
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
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
      <div style={{ margin: "auto", width: 300}}>
       <Circle percent={this.state.percent} strokeWidth="4" strokeColor="#428bca" />
        <div class="input-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile04"/>
          <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
        </div>
        </div>
      </div>
    )
  }
}

export default (RestaurantHome)
