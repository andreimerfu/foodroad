import React from 'react';

export const LocationInput = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
  }) => (
  <div>
    <input
      {...getInputProps({
        placeholder: 'Search location ...',
        className: 'location-search-input form-control form-control-search input-lg',
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
)
