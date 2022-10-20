import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import api from './utils/api';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';
import './styles.css';
import TradeItemModal from './components/TradeItemModal';

export default function App() {
  const [show, setShow] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = () => {
    api.get('/fetch-items').then(response => {
      const { data } = response;

      setItems(data.map((values) => {
        const [id, timestamp, type, name, imageUrl, owner ] = values;

        return {
          timestamp,
          data: {
            id,
            name,
            imageUrl,
            type,
            owner,
          }
        }
      }));
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const addItem = (item) => {
    api.post('/create-item', item)
    .then(() => getItems());
  };

  const refreshItems = () => {
    getItems();
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center header">
        <Col>
          <h1 className="py-5">
            <strong>
              Team Fortress 2 - Global Items
            </strong>
          </h1>
        </Col>
        <Col sm={3}>
          <Button
            size="lg"
            variant="outline-success"
            onClick={() => setShow(true)}
          >
            Insert Item
          </Button>
          <Button
              size="lg"
              variant="outline-primary"
              onClick={refreshItems}
            >
              Refresh
          </Button>

          <Button
              className='trade-btn'
              size="lg"
              variant="outline-primary"
              onClick={() => setShowTrade(true)}
            >
              Trade
          </Button>
        </Col>
        <Col sm={1}>
          
        </Col>
      </Row>
      <ItemList items={items} />
      <AddItemModal show={show} closeModal={() => setShow(false)} addItem={addItem} />
      <TradeItemModal show={showTrade} closeModal={() => setShowTrade(false)} addItem={addItem} />
    </Container>
  );
}