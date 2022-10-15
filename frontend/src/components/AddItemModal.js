import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

export default function AddItemModal({ show, closeModal, addItem }) {
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
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="py-4">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col sm={10}>
                <Form.Group className="pb-3">
                  <Form.Label>Name</Form.Label>
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
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text" 
                    name="imageUrl"
                    value={item.imageUrl}
                    onChange={handleUserInput}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={10}>
                <Form.Group className="pb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select 
                    name="type" 
                    onChange={handleUserInput}
                  >
                    <option value="weapon">Weapon</option>
                    <option value="cosmetic">Cosmetic</option>
                    <option value="consumable">Consumable</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={10}>
              <Form.Group>
                <Form.Label>Owner</Form.Label>
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