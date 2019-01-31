import React from 'react';
import { Line, Circle } from 'rc-progress';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Redirect, Link } from 'react-router-dom';
import {RingLoader} from "react-spinners";

class RestaurantHome extends React.Component {

  constructor() {
    super();
    this.state = {
      percent: 0,
      color: "#428bca"
    };
    this.checkCuiAction = this.checkCuiAction.bind(this);
    this.handleAddDocumentsEvent = this.handleAddDocumentsEvent.bind(this);
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
        <div className="my-auto">
          <span class="badge badge-success float-right">Verified</span>
        </div>
      )
    } else {
      return (
        <div className="my-auto">
          <span class="badge badge-warning float-right">Pending</span>
        </div>
      )
    }
  }

  handleAddDocumentsEvent(e) {
    if (e) {
      const formData = new FormData();
      formData.append('documents', e.target.files[0]);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      this.props.dispatch(actions.updateRestaurantInfo(this.props.restaurant.id, formData, config));
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
       if (restaurant.approval_status === "approved") {
          return <Redirect to={{pathname: '/activeOrders'}} />
       }

      return(
        <div className="wrap">
          <div style={{ margin: "auto", width: 400, "margin-top": "120px"}}>
           <CircularProgressbar
              percentage={restaurant.progress_value}
              text={(restaurant.progress_value) + " %"}
              initialAnimation="true"
            />
            </div>
            <div className="row justify-content-center">
              <div className="py-5 col-md-8">
              <h3 class="text-base text-primary pb-5" > Esti la un click distanta de a deveni restaurant partener Food Road</h3>
                <div className="pb-4">
                  <p className="mb-2"> Pasul 1 : Verifica CUI-ul firmei </p>
                  <div className="d-flex justify-content-between pl-5">
                    <div>
                      <button className=" btn btn-primary" onClick={this.checkCuiAction}> Verifica CUI </button>
                    </div>
                    { this.renderVerifiedStatus(restaurant.validation_steps['cui'])}
                  </div>
                </div>

                <div className="pb-4">
                  <p className="mb-2"> Pasul 2 : Adauga documente restaurant </p>
                  <div className="d-flex justify-content-between pl-5">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="inputGroupFile04" onChange={this.handleAddDocumentsEvent}/>
                      <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                    </div>
                    { this.renderVerifiedStatus(restaurant.validation_steps['documents'])}
                  </div>
                </div>

                <div className="pb-4">
                  <p className="mb-2"> Pasul 3 : Adauga informatii referitoare la restaurant </p>
                <div className="d-flex justify-content-between pl-5">
                    <Link to="/restaurantInfo" className="btn btn-primary">Completeaza informatiile</Link>
                    { this.renderVerifiedStatus(restaurant.validation_steps['informations'])}
                  </div>
                </div>

                <div className="pb-4">
                  <p className="mb-2"> Pasul 4 : Adauga meniul </p>
                <div className="d-flex justify-content-between pl-5">
                    <Link to="/restaurantAdmin" className="btn btn-primary">Completeaza meniul</Link>
                    { this.renderVerifiedStatus(restaurant.validation_steps['menu'])}
                  </div>
                </div>

             </div>
             </div>
        </div>
      )
    } else {
      return (
          <RingLoader
              sizeUnit={"px"}
              size={100}
              color={'#123abc'}
              loading={true}
          />
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
