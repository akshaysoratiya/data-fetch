import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



function Comments() {
  const { loginData } = useContext(GlobalContext);
  const [commentdata, SetCommentData] = useState([]);

  useEffect(() => {
    (async () => {
      const comments = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${loginData.id}`)
      SetCommentData(comments.data)
    })()
  }, [loginData])
  return (
    <div>

      <Container>
        <Row>
          {commentdata.map(post =>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{post.name}</Card.Title>
                  <Card.Text>
                    {post.email}
                  </Card.Text>
                  <Card.Text>
                    {post.body}
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

export default Comments