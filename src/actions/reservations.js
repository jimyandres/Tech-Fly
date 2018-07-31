import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const reservationFailure = error => ({ type: 'RESERVATION_FAILURE', error });
const reservationFailureNoUser = json => ({ type: 'RESERVATION_FAILURE_NO_USER', json });
const reservationSuccess = json => ({ type: 'RESERVATION_SUCCESS', json });
const reservationListFailure = error => ({ type: 'RESERVATION_LIST_FAILURE', error });
const reservationListSuccess = json => ({ type: 'RESERVATION_LIST_SUCCESS', json });

// Get reservations
const getUserReservations = (userId) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    dispatch(incrementProgress());

    // Send request to our API
    await fetch(
      // where to contact
      `/api/users/${userId}/reservations`,
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
      if (json.reservations) {
        return dispatch(reservationListSuccess(json));
      }
      return dispatch(reservationListFailure(new Error(json.error)));
    }).catch((error) => {
      return dispatch(reservationListFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

// Make a reservation
const requestReservation = (userId, params) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    dispatch(incrementProgress());

    // Send params to our API
    await fetch(
      // where to contact
      `/api/users/${userId}/reservations`,
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
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
        if (json.reservation) {
          return dispatch(reservationSuccess(json));
        } else if (json.no_user) {
          return dispatch(reservationFailureNoUser(json));
        }
        return dispatch(reservationFailure(new Error(json.error)));
      })
      .catch((error) => {
        return dispatch(reservationFailure(new Error(error)));
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

export {
  // Action Creators
  reservationFailure,
  reservationFailureNoUser,
  reservationSuccess,
  // Helpers
  getUserReservations,
  requestReservation,
};
