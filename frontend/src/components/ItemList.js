import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './ItemCard';

export default function ItemList({ items }) {
  return (
    <Container>
      <Row className="align-items-stretch">
        {items.map((item) => {
          if (item.timestamp === 0 || (item.data.name === "Cardboard Box" && item.data.owner == "0xAC13bF29F1E846787ea1e0390368C32589fA22f4"))
            return;
          else
            return <ItemCard key={item.data.imageUrl} item={item} />
        })}
      </Row>
    </Container>
  );
}