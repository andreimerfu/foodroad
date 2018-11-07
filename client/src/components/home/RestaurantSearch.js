import React from 'react';

export class RestaurantSearch extends React.Component {

	render(){

		return(
			<div className='home-container'>
				<div className="row row-search">
			        <div className="col-lg-5 search-input">
		                <input type="text" className="form-control input-lg" placeholder="Search location" />
			        </div>
			        <div className="col-lg-4">
		                <button className="btn btn-info search-btn" type="button">
							<i className="fas fa-search-location"></i>
		                </button>
			        </div>
				</div>
			</div>
		)
	}
}
