import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './ItemCard';

export default function ItemList({ items }) {
  return (
    <Container>
      <Row className="align-items-stretch">
        {items.map((item) => (
          <ItemCard key={item.data.imageUrl} item={item} />
        ))}
      </Row>
    </Container>
  );
}