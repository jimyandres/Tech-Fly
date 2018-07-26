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
      date: moment(),
      options: [{ id: 0, location: 'Nothing here.' }],
      origin: '',
      destination: '',
    };

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
    const { origin, destination, date } = this.state;
    if (typeof origin[0] !== 'undefined' && typeof destination[0] !== 'undefined') {
      searchFlightsFunction({ origin, destination, date });
    }
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
                onChange={(from) => this.setState({origin: from})}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Destino</InputGroupAddon>
              <Typeahead
                labelKey="location"
                options={this.state.options}
                placeholder="Choose a state..."
                onChange={(to) => this.setState({destination: to})}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Fecha</InputGroupAddon>
              <Input type="date" onChange={(date) => this.setState({date: date.target.value})} />
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
