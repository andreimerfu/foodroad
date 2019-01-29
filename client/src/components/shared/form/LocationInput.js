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
        placeholder: 'Adresa, de exemplu Calea Victoriei 1 ',
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
          ? { backgroundColor: '#ffffff', cursor: 'pointer', margin: '5px' }
          : { backgroundColor: '#f2f1f2', cursor: 'pointer', margin: '5px' };
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
