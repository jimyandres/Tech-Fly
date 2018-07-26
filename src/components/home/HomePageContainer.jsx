import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAirportsLocation } from '../../actions/airports';
import { searchFlights } from '../../actions/flights';

import HomePage from './HomePage';

class HomePageContainer extends Component {
  componentWillMount() {
    const { getLocations } = this.props;
    getLocations();
  }

  render() {
    const { locations, flights, searchFlightsFunction } = this.props;
    return (
      <HomePage
        locations={locations}
        searchFlightsFunction={searchFlightsFunction}
        flights={flights}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getLocations: getAirportsLocation,
  searchFlightsFunction: searchFlights,
  dispatch,
}, dispatch);

const mapStateToProps = state =>
  ({
    locations: state.list.locations,
    flights: state.list.flights,
  });

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
