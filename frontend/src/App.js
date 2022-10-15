import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import api from './utils/api';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';

export default function App() {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = () => {
    api.get('/get-chain').then(response => {
      setItems(response.data.chain);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const addItem = (item) => {
    api.post('/create-block', item)
    .then(() => getItems());
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="py-5">
            <strong>
              Team Fortress 2 - Global Items
            </strong>
          </h1>
        </Col>
        <Col sm={2}>
          <Button
            size="lg"
            variant="outline-success"
            onClick={() => setShow(true)}
          >
            Insert Item
          </Button>
        </Col>
      </Row>
      <ItemList items={items} />
      <AddItemModal show={show} closeModal={() => setShow(false)} addItem={addItem} />
    </Container>
  );
}