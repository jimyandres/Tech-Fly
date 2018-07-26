const initialState = {
  flights: [],
  locations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FLIGHT_SEARCH_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.flights = action.json.flights;
      return newState;
    }
    case 'AIRPORTS_LOCATION_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.locations = action.json.locations;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
