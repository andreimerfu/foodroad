
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import {RingLoader} from "react-spinners";

const RestaurantInfoForm = props => {

    const { handleSubmit, pristine, submitting, submitCb, errors, restaurantInfo} = props;
    if (Object.keys(restaurantInfo).length > 0) {

        return (
            <div className="wrap py-5 row justify-content-center">
                <div className="col-md-8 py-5">
                <form onSubmit={handleSubmit(submitCb)}>
                    <Field
                        name="delivery_zone"
                        type="text"
                        label='Zona de livrare (km)'
                        className='form-control border-0 shadow'
                        component={AuthInput}
                    />
                    <Field
                        name="delivery_time"
                        type="number"
                        label='Timpul de livrare (minute)'
                        className='form-control border-0 shadow text-violet'
                        value={restaurantInfo.delivery_time}
                        component={AuthInput}
                    />
                    <Field
                        name="min_order"
                        type="number"
                        label='Comanda minima (LEI)'
                        className='form-control border-0 shadow text-violet'
                        value={restaurantInfo.min_order}
                        component={AuthInput}
                    />
                    <div>
                        <button className='btn btn-primary shadow px-5 my-4' type="submit"
                                disabled={pristine || submitting}>
                            Actualizeaza
                        </button>
                    </div>
                </form>
                </div>
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