import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//import * as actions from '../../actions';
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';


class RestaurantSearch extends React.Component {
	static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

	constructor(props) {
    super(props);
    this.state = { address: '' };
    //const { cookies } = props;
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
      	console.log('Success', latLng)
  	    //actions.setLocation(latLng);
  	     const { cookies } = this.props;

    		cookies.set('latLng', latLng, { path: '/' });
      })
      .catch(error => console.error('Error', error));
  };


	render(){
		return(
			<div className='home-container'>
				<div className="row row-search">
			    <div className="col-lg-5 search-input">
						 <PlacesAutocomplete
			        value={this.state.address}
			        onChange={this.handleChange}
			        onSelect={this.handleSelect}
			      >
			        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
			          <div>
			            <input
			              {...getInputProps({
			                placeholder: 'Search location ...',
			                className: 'location-search-input form-control input-lg',
			              })}
			            />
			            <div className="autocomplete-dropdown-container">
			              {loading && <div>Loading...</div>}
			              {suggestions.map(suggestion => {
			                const className = suggestion.active
			                  ? 'suggestion-item--active'
			                  : 'suggestion-item';
			                // inline style for demonstration purpose
			                const style = suggestion.active
			                  ? { backgroundColor: '#fafafa', cursor: 'pointer', margin: '5px' }
			                  : { backgroundColor: '#ffffff', cursor: 'pointer', margin: '5px' };
			                return (
			                  <div
			                    {...getSuggestionItemProps(suggestion, {
			                      className,
			                      style,
			                    })}
			                  >
			                    <span>{suggestion.description}</span>
			                  </div>
			                );
			              })}
			            </div>
			          </div>
			        )}
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
