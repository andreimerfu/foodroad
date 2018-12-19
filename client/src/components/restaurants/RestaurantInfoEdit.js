import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import RestaurantInfoForm from './RestaurantInfoForm'
import {updateRestaurantInfo} from "../../actions";
import axios from "axios";
import {RingLoader} from "react-spinners";


class RestaurantInfoEdit extends React.Component {

    constructor() {
        super();
        this.updateRestaurantInfo = this.updateRestaurantInfo.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/v1/get_restaurant_id`, {
            headers: {
                'uid': localStorage.getItem('uid'),
                'client': localStorage.getItem('client'),
                'access-token': localStorage.getItem('accessToken'),
                'expiry': localStorage.getItem('expiry'),
            }
        }).then(res => {
            this.props.dispatch(actions.getRestaurantInfo(res.data))
        });
    }

    updateRestaurantInfo(info) {
        axios.get(`/api/v1/get_restaurant_id`, {
            headers: {
                'uid': localStorage.getItem('uid'),
                'client': localStorage.getItem('client'),
                'access-token': localStorage.getItem('accessToken'),
                'expiry': localStorage.getItem('expiry'),
            }
        }).then(res => {
            this.props.dispatch(actions.updateRestaurantInfo(res.data, info));
        }).catch(error => {
            console.log("Error updateRestaurantInfo");
        })
    }

    render() {
        const rest = this.props.restaurant.attributes;
        if (rest && Object.keys(rest).length > 0) {
            return (
                <RestaurantInfoForm restaurantInfo={rest} submitCb={this.updateRestaurantInfo}/>
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
        // auth: state.authr
        restaurant: state.restaurant.data
    }
}
export default connect(mapStateToProps)(RestaurantInfoEdit)
