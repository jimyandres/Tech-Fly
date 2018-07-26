import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const airportsLocationFailure = error => ({ type: 'AIRPORTS_LOCATION_FAILURE', error });
const airportsLocationSuccess = json => ({ type: 'AIRPORTS_LOCATION_SUCCESS', json });

// Get the airports location from the DB
const getAirportsLocation = () => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Call our API, to get the locations
    await fetch(
      // where to contact
      '/api/airports/locations',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json.locations) {
          return dispatch(airportsLocationSuccess(json));
        }
        return dispatch(airportsLocationFailure(new Error(json.error)));
      })
      .catch(error => dispatch(airportsLocationFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

export {
  // Action Creators
  airportsLocationSuccess,
  airportsLocationFailure,
  // Others
  getAirportsLocation,
};
