import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ReservationModal = (props) => {
  const {
    title,
    handleButton,
    handleToggle,
    children,
    singleButton,
    isOpen,
  } = props;
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered >
      <ModalHeader toggle={handleToggle}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        { singleButton ?
          <Button color="secondary" onClick={handleToggle}>Aceptar</Button> :
          <div>
            <Button color="success" onClick={handleButton}>Reservar</Button>{' '}
            <Button color="secondary" onClick={handleToggle}>Cancelar</Button>
          </div>
        }
      </ModalFooter>
    </Modal>
  );
};

export default ReservationModal;
