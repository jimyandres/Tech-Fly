const initialState = {
  flights: [],
  locations: [],
  lastReservation: {},
  newUser: false,
  userReservations: [],
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
    case 'RESERVATION_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.lastReservation = action.json.reservation;
      return newState;
    }
    case 'ADD_USER_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.newUser = false;
      return newState;
    }
    case 'RESERVATION_FAILURE_NO_USER': {
      const newState = Object.assign({}, state);
      newState.newUser = action.json.no_user;
      return newState;
    }
    case 'RESERVATION_LIST_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.userReservations = action.json.reservations;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
