
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import {RingLoader} from "react-spinners";

const RestaurantInfoForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, errors, restaurantInfo} = props;
    if (Object.keys(restaurantInfo).length > 0) {
        return (
            <div>
                <form onSubmit={handleSubmit(submitCb)}>
                    <Field
                        name="delivery_zone"
                        type="text"
                        label='Delivery zone (km)'
                        className='form-control border-0 shadow'
                        component={AuthInput}
                    />
                    <Field
                        name="delivery_time"
                        type="number"
                        label='Deliver_time (minutes)'
                        className='form-control border-0 shadow text-violet'
                        value={restaurantInfo.delivery_time}
                        component={AuthInput}
                    />
                    <Field
                        name="min_order"
                        type="number"
                        label='Minimal Order (LEI)'
                        className='form-control border-0 shadow text-violet'
                        value={restaurantInfo.min_order}
                        component={AuthInput}
                    />
                    <div>
                        <button className='btn btn-primary shadow px-5 my-4' type="submit"
                                disabled={pristine || submitting}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        )
    } else {
                        return(
                            <RingLoader
                                sizeUnit={"px"}
                                size={100}
                                color={'#123abc'}
                                loading={true}
                            />
                        )
    }
};

export default reduxForm({
    form: 'loginForm',
})(RestaurantInfoForm)