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
      <div className="container-search">
      <section id="search-address">
      <div class="search-address-image">
      </div>
      <div class="search-address py-5 ">
        <div class="container-search text-center">
          <h1 class="hero-heading mb-0 text-primary text-uppercase">Find your restaurants</h1>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6 ">
                  <p class="lead text-muted mt-4 mb-4">Be hungry and try FoodRoad.</p>
                  <form action="#" class="subscription-form">
                    <div class="form-group">
                      <PlacesAutocomplete
                          value={this.state.address}
                          onChange={this.handleChange}
                          onSelect={this.handleSelect}
                        >
                        {LocationInput}
                        </PlacesAutocomplete>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
    </section>
    </div>
		)
	}
}
export default withCookies(RestaurantSearch);
