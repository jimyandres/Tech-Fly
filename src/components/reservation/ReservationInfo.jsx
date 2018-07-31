import React, { Component } from 'react';
import moment from 'moment';
import { Collapse, CardBody, Card, CardHeader, CardTitle, CardText } from 'reactstrap';

class ReservationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    moment.locale('es');
    const {
      seatsReserved,
      status,
      flight,
    } = this.props.reservation;

    const origin = ` ${flight.originAirport.name}, ${flight.originAirport.location}.`;
    const destination = ` ${flight.destinationAirport.name}, ${flight.destinationAirport.location}.`;
    const airline = flight.airline.name;
    const { departureTime, arrivalTime, cost } = flight;
    return (
      <Card>
        <CardHeader color="primary" onClick={this.toggle} className="pointer">
          {`(${status}) ${flight.originAirport.location} - ${flight.destinationAirport.location}. ${moment(departureTime, 'YYYYMMDD HH:mm Z').format('MMMM D, YYYY, h:mm a')} (${airline})`}
        </CardHeader>
        <Collapse
          isOpen={this.state.collapse}
        >
          <CardBody>
            <CardTitle>{airline}</CardTitle>
            <CardText>
              <span>
                <strong>
                  Desde:
                </strong>
                {origin + moment(departureTime, 'YYYYMMDD HH:mm Z').format('dddd, MMMM Do YYYY, h:mm a')}
              </span>
              <br />
              <span>
                <strong>
                  Hasta:
                </strong>
                {destination + moment(arrivalTime, 'YYYYMMDD HH:mm Z').format('dddd, MMMM Do YYYY, h:mm a')}
              </span>
              <br />
              <span>
                <strong>
                  Puestos reservados:
                </strong>
                {` ${seatsReserved}`}
              </span>
              <br />
              <span>
                <strong>
                  Costo Total:
                </strong>
                {` $${cost * seatsReserved}`}
              </span>
            </CardText>
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default ReservationInfo;
