import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const flightSearchFailure = error => ({ type: 'FLIGHT_SEARCH_FAILURE', error });
const flightSearchSuccess = json => ({ type: 'FLIGHT_SEARCH_SUCCESS', json });

// Search flights
const searchFlights = (params) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());


    dispatch(incrementProgress());

    // Get params to call the API
    const { origin, destination, date } = params;

    // Send params to our API
    await fetch(
      // where to contact
      `/api/flights?from=${origin[0].id}&to=${destination[0].id}&date=${date}`,
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((json) => {
      if (json.flights) {
        return dispatch(flightSearchSuccess(json));
      }
      return dispatch(flightSearchFailure(new Error(json.error)));
    }).catch(error => dispatch(flightSearchFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

export {
  // action creators
  flightSearchSuccess,
  flightSearchFailure,
  // helpers
  searchFlights,
};
