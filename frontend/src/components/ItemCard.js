import React from 'react';
import { Card, Col } from 'react-bootstrap';

export default function ItemCard({ item }) {
  return (
    <Col sm={4} md={3}>
      <Card className="mb-3 h-80">
        <Card.Img variant="top" src={item.data.imageUrl} />
        <Card.Body>
          <Card.Title className="py-2">{item.data.name}</Card.Title>
          <Card.Subtitle className="pb-2">{item.data.type.charAt(0).toUpperCase() + item.data.type.substring(1)}</Card.Subtitle>
          <Card.Text>
            <strong>Owned by:</strong>
            <p>{item.data.owner}</p>

            <strong>Timestamp:</strong>
            <p>{item.timestamp}</p>

            <strong>Hash:</strong>
            <p>{item.hash}</p>

            <strong>Previous hash:</strong>
            <p>{item.previous_hash}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}