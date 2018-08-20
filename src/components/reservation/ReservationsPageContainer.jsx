import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserReservations } from '../../actions/reservations';

import ReservationsPage from './ReservationsPage';

class ReservationsPageContainer extends Component {
  constructor(props) {
    super(props);

    this.getReservations = this.getReservations.bind(this);
  }

  getReservations() {
    const { searchReservationsFunction } = this.props;
    const { id } = this.props.match.params;
    if (id !== '') {
      searchReservationsFunction(id);
    }
  }

  componentWillMount() {
    // Before the component mounts, check for an existing user session
    this.getReservations();
  }

  render() {
    const { searchReservationsFunction, reservations } = this.props;
    return (
      <ReservationsPage
        searchReservationsFunction={searchReservationsFunction}
        reservations={reservations}
      />
    );
  }
}

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
