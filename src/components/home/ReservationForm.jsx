import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { requestReservation } from '../../actions/reservations';
import { addUser } from '../../actions/users';
import ReservationModal from './ReservationModal';

class ReservationForm extends Component {
  constructor(props) {
    super(props);

    this.handleReservationModal = this.handleReservationModal.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      modal: false,
      id: -1,
      seatsReserved: -1,
      birthday: moment().format('YYYY-MM-DD'),
      name: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { newUser } = this.props;
    if (newUser && newUser !== prevProps.newUser) {
      this.setState({ modal: true });
    }
  }

  handleReservationModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  handleReservation() {
    const {
      addReservartionFunction,
      createUserFunction,
      flightId,
      newUser,
    } = this.props;
    const {
      birthday,
      id,
      name,
      seatsReserved,
    } = this.state;
    if (+seatsReserved > 0 && +seatsReserved <= 10 && +id > 0) {
      if (newUser && birthday < moment().format('YYYY-MM-DD') && name.trim() !== '') {
        createUserFunction({ id, birthday, name })
          .then(() => addReservartionFunction(id, { seatsReserved, flight: flightId, status: 'no-pago' }));
        this.setState({ modal: false });
      } else if (!newUser) {
        addReservartionFunction(id, { seatsReserved, flight: flightId, status: 'no-pago' });
        this.setState({ modal: false });
      }
    }
  }

  render() {
    const { modal } = this.state;
    const { newUser } = this.props;
    return (
      <div>
        <Button color="danger" onClick={this.handleReservationModal}>Reservar</Button>
        <ReservationModal
          title="Reservación"
          handleButton={this.handleReservation}
          handleToggle={this.handleReservationModal}
          singleButton={false}
          isOpen={modal}
        >
          <div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Documento</InputGroupAddon>
              <Input
                name="id"
                type="number"
                onChange={this.handleInput}
              />
            </InputGroup>
            {
              newUser ?
                <div>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Nacimiento</InputGroupAddon>
                    <Input
                      name="birthday"
                      type="date"
                      max={moment().format('YYYY-MM-DD')}
                      onChange={this.handleInput}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Nombre</InputGroupAddon>
                    <Input
                      name="name"
                      type="text"
                      onChange={this.handleInput}
                    />
                  </InputGroup>
                </div> :
              null
            }
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">N° Asientos</InputGroupAddon>
              <Input
                name="seatsReserved"
                type="number"
                onChange={this.handleInput}
              />
            </InputGroup>
          </div>
        </ReservationModal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addReservartionFunction: requestReservation,
  createUserFunction: addUser,
  dispatch,
}, dispatch);

const mapStateToProps = state => ({
  lastReservation: state.list.lastReservation,
  userInformation: state.list.userInformation,
  newUser: state.list.newUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
