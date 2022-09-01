import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



function Posts() {
    const { loginData } = useContext(GlobalContext);
    const [postdata, SetPostData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const post = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${loginData.id}`)
            Promise.all(post.data.map(r => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${r.id}`).then(res => ({ ...r, commentCount: res.data.length })))
            ).then(data => {
                SetPostData(data);
            })()
        })()
    }, [loginData])

    return (
        <div>

            <Container>
                <Row>
                    {postdata.map(post =>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.body}
                                    </Card.Text>
                                    <Button onClick={() => navigate(`/comments?postId=${post.id}`)}>Comments - {post.commentCount}</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Posts