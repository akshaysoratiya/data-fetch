import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Photos() {
  const { loginData } = useContext(GlobalContext);
  const [photodata, SetPhotoData] = useState([]);

  useEffect(() => {
    (async () => {
      const photo = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${loginData.id}`)
      SetPhotoData(photo.data)

    })()
  }, [])
  return (
    <div>
        <Container>
          <Row>
      {photodata.map(post =>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={post.url} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.url}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
          </Row>
        </Container>
    </div>
  )
}

export default Photos