import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { LocationInput } from '../shared/form/LocationInput';

class RestaurantSearch extends React.Component {
	static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

	constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  componentWillMount() {
  	const { cookies } = this.props
  	var latLng = cookies.get('latLng')

  	if (latLng != null) {
  		this.setState({
        redirect: true
      })
  	}
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
  	    const { cookies } = this.props;
    		cookies.set('latLng', latLng, { path: '/' });
    		cookies.set('address', address, { path: '/'});
    		window.location.reload();
      })
      .catch(error => console.error('Error', error));
  };

	render(){
		if (this.state.redirect === true) {
      return <Redirect to={{pathname: '/restaurants'}} />
		}
		return(
			<div className='home-container'>
				<div className="row row-search">
			    <div className="col-lg-5 search-input">
						 <PlacesAutocomplete
			        value={this.state.address}
			        onChange={this.handleChange}
			        onSelect={this.handleSelect}
			      >
			        {LocationInput}
			      </PlacesAutocomplete>
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
export default withCookies(RestaurantSearch);
