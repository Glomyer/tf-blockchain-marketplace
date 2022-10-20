import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export default function TradeItemModal({ show, closeModal, addItem }) {
  const initialState = {
    name: '',
    imageUrl: '',
    type: 'weapon',
    owner: '',
  };

  const [item, setItem] = useState(initialState);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(item);
    closeModal();
    setItem(initialState);
  };

  const handleClose = () => {
    closeModal();
    setItem(initialState);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Trade Items</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="py-4">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col sm={10}>
                <Form.Group className="pb-3">
                  <Form.Label>Item name</Form.Label>
                  <Form.Control
                    type="text" 
                    name="name"
                    value={item.name}
                    onChange={handleUserInput}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col sm={10}>
                <Form.Group className="pb-3">
                  <Form.Label>Proposal type</Form.Label>
                  <Form.Select 
                    name="type" 
                    onChange={handleUserInput}
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="trade">Trade</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={10}>
              <Form.Group>
                <Form.Label>ETH to pay (in Gwei)</Form.Label>
                <Form.Control
                  type="text" 
                  name="owner"
                  value={item.owner}
                  onChange={handleUserInput}
                  required
                />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}