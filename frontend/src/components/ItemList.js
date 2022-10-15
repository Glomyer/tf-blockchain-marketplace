import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './ItemCard';

export default function ItemList({ items }) {
  return (
    <Container>
      <Row className="align-items-stretch">
        {
          items.map((item) => {
            if (!item.data.id)
              return (<span key={item.hash}>Bloco gênese. hash: {item.hash}</span>);
            else
              return (<ItemCard key={item.hash} item={item} />);
          })
        }
      </Row>
    </Container>
  );
}