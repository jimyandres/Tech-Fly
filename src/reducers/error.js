const initialState = {
  isError: false,
  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FLIGHT_SEARCH_FAILURE':
    case 'AIRPORTS_LOCATION_FAILURE': {
      const newState = Object.assign({}, initialState);
      newState.isError = true;
      newState.error = action.error;
      return newState;
    }
    case 'ERROR_CLEARED': {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;