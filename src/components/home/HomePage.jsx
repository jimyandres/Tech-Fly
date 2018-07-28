import React, { Component } from 'react';
import moment from 'moment';
import { InputGroup, InputGroupAddon, Input, Button, Col } from 'reactstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import FlightInfo from './FlightInfo';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      date: moment().format('YYYY-MM-DD'),
      filters: ['origin', 'destination', 'date'],
      options: [{ id: 0, location: 'Nothing here.' }],
    };

    this.handleFilters = this.handleFilters.bind(this);
    this.searchFlights = this.searchFlights.bind(this);
  }


  shouldComponentUpdate(nextProps) {
    if (nextProps.locations !== this.state.options) {
      return nextProps.locations.length > 0;
    }
    if (nextProps.flights !== this.props.flights) {
      return nextProps.flights.length > 0;
    }
    return false;
  }

  componentDidUpdate() {
    const { locations } = this.props;
    this.setState({ options: locations });
  }

  searchFlights() {
    const { searchFlightsFunction } = this.props;
    const {
      origin,
      destination,
      date,
      filters,
    } = this.state;
    if (origin !== '' && destination !== '' && date !== '' && moment(date).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) {
      const params = [];
      filters.map(filter => params.push({ name: filter, value: this.state[filter] }));
      searchFlightsFunction(params);
    }
  }

  handleFilters(filterValue = '', filterName) {
    this.setState({ [filterName]: filterValue });
  }

  render() {
    const { flights } = this.props;
    return (
      <div>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1>Tech & Fly</h1>
          <div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Origen</InputGroupAddon>
              <Typeahead
                labelKey="location"
                options={this.state.options}
                placeholder="Choose a state..."
                onChange={from => this.handleFilters(from[0] ? from[0].id : '', 'origin')}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Destino</InputGroupAddon>
              <Typeahead
                labelKey="location"
                options={this.state.options}
                placeholder="Choose a state..."
                onChange={to => this.handleFilters(to[0] ? to[0].id : '', 'destination')}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Fecha</InputGroupAddon>
              <Input
                type="date"
                min={moment().format('YYYY-MM-DD')}
                onChange={date => this.handleFilters(date.target.value, 'date')}
                defaultValue={this.state.date}
              />
            </InputGroup>
            <br />
            <Button onClick={this.searchFlights} block>Buscar</Button>
          </div>
          <br />
          <Flights flights={flights} />
        </Col>
      </div>
    );
  }
}

const Flights = ({ flights }) => {
  return (
    <div>
      { typeof flights[0] !== 'undefined' ?
        flights.map(f =>
          (<FlightInfo
            key={f._id}
            id={f._id}
            origin={` ${f.originAirport.name}, ${f.originAirport.location}. `}
            destination={` ${f.destinationAirport.name}, ${f.destinationAirport.location}. `}
            departureTime={f.departureTime}
            arrivalTime={f.arrivalTime}
            cost={f.cost}
            airline={f.airline.name}
           />))
      : null }
    </div>
  );
};

export default HomePage;
