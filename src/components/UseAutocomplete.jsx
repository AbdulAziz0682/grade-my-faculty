/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable brace-style */
import React, { useState } from 'react';

import {
  MenuItem,
} from '@mui/material';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

const AutoComplete = ({ suggestions, disabled, data }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) => (
        suggestion.name
          ? suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          : suggestion.firstName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ),
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  /*  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  }; */

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  function SuggestionsListComponent() {
    const history = useHistory();
    return filteredSuggestions.length ? (
      <ul className="bg-gray-100 border-2 border-gray-300 suggestions rounded-b-3xl md:rounded-none">
        {filteredSuggestions.map((suggestion, index) => {
          // let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            // className = 'suggestion-active';
          }

          if (!suggestion.institute) {
            return (
              <MenuItem sx={{ border: '1px solid' }} className="py-3 font-semibold bg-gray-100 border-l-0 border-r-0 border-gray-200" value={suggestion.name} onClick={() => history.push('/faculty', [suggestion])}>{suggestion.name}</MenuItem>
            );
          }

          return (
            <MenuItem
              value={suggestion.firstName}
              sx={{ border: '1px solid' }}
              className="py-1 bg-gray-100 border-l-0 border-r-0 border-gray-200"
              onClick={() => history.push('/grade', [{ ...suggestion, institute: data.institutes.find((i) => Number(i._id) === Number(suggestion.institute)) }])}
            >
              <div className="flex items-end justify-between gap-3 pb-2 overflow-auto" style={{ fontFamily: 'montserrat' }}>
                <div className="flex flex-col">
                  <p className="font-semibold">{suggestion.firstName}</p>
                  <span className="text-xs text-primary">
                    {suggestion.department}
                    &nbsp;Department
                  </span>
                </div>
                <p className="font-bold">
                  {
                    data
                    && (
                      data.institutes.find((i) => i._id === suggestion.institute).name
                    )
                  }
                </p>
              </div>
            </MenuItem>
          );
        })}
      </ul>
    ) : (
      <div className="bg-gray-100 no-suggestions rounded-b-3xl">
        <em>sorry no suggestions</em>
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        type="text"
        name={`auto-comp-${Math.random()}`} // This random name is for disabling browser suggesstions
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={`${disabled ? 'Loading...' : ''}`}
        value={input}
        id="autocomplete"
        className={`${showSuggestions && input ? 'rounded-t-3xl md:rounded' : 'rounded'} border-2 border-gray-300 bg-gray-100`}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};

export default AutoComplete;

AutoComplete.propTypes = {
  suggestions: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};
