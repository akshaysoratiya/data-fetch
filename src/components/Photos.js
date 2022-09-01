import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'

function Photos() {
  const { loginData } = useContext(GlobalContext);
  const [photodata, SetPhotoData] = useState([]);
  let { search } = useLocation()
  let { albumId } = queryString.parse(search)

  useEffect(() => {
    (async () => {
      const post = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${albumId}`)
      Promise.all(post.data.map(r => axios.get(`https://jsonplaceholder.typicode.com/photos?albums=${r.id}`).then(res => { SetPhotoData(res.data) }))
      )
    })()
  }, [loginData])
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