import React, { Component } from 'react';
import moment from 'moment';
import { Button, Collapse, CardBody, Card, CardHeader, CardTitle, CardText } from 'reactstrap';

class FlightInfo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    moment.locale('es');
    const {
      origin,
      destination,
      departureTime,
      arrivalTime,
      airline,
      cost,
    } = this.props;
    return (
      <Card>
        <CardHeader color="primary" onClick={this.toggle}>
          {
            moment(departureTime, "YYYYMMDD HH:mm Z").format("MMM Do YY, h:mm:ss a")
            +
            ' (' + airline + ')  $' + cost
          }
        </CardHeader>
        <Collapse
          isOpen={this.state.collapse}
        >
          <CardBody>
            <CardTitle>{airline}</CardTitle>
            <CardText>
              <p>
                <strong>
                  Desde:
                </strong>
                {origin + moment(departureTime, 'YYYYMMDD HH:mm Z').format('MMM Do YY, h:mm:ss a')}
              </p>
              <p>
                <strong>
                  Hasta:
                </strong>
                {destination + moment(arrivalTime, 'YYYYMMDD HH:mm Z').format('MMM Do YY, h:mm:ss a')}
              </p>
            </CardText>
            <Button disabled >Reservar</Button>
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default FlightInfo;
