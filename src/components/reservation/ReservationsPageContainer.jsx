import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserReservations } from '../../actions/reservations';

import ReservationsPage from './ReservationsPage';

const ReservationsPageContainer = (props) => {
  const { searchReservationsFunction, reservations } = props;
  return (
    <ReservationsPage
      searchReservationsFunction={searchReservationsFunction}
      reservations={reservations}
    />
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  searchReservationsFunction: getUserReservations,
  dispatch,
}, dispatch);

const mapStateToProps = state => ({
  reservations: state.list.userReservations,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationsPageContainer);
