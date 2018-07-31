import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button, Col } from 'reactstrap';
import ReservationInfo from './ReservationInfo';

class ReservationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.getReservations = this.getReservations.bind(this);
  }

  getReservations() {
    const { searchReservationsFunction } = this.props;
    const { id } = this.state;
    if (id.trim() !== '' && id > 0) {
      searchReservationsFunction(id);
    }
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { reservations } = this.props;
    return (
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <h2>Reservaciones</h2>
        <div>
          <InputGroup>
            <Input
              placeholder="Documento..."
              type="number"
              name="id"
              onKeyPress={this.handleInput}
            />
            <InputGroupAddon addonType="prepend">
              <Button
                color="success"
                onClick={this.getReservations}
              >
                Buscar Reservas
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <br />
          <ReservationList
            reservations={reservations}
          />
        </div>
      </Col>
    );
  }
}

const ReservationList = ({ reservations }) => {
  return (
    <div>
      { reservations.length ?
        reservations.map(r =>
          (<ReservationInfo
            key={r._id}
            id={r._id}
            reservation={r}
           />)
        ) :
        null
        }
    </div>
  );
};

export default ReservationPage;
