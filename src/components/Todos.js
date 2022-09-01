import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Globalcontext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Todos() {
    const { loginData } = useContext(GlobalContext);
    const [tododata, SetTodoData] = useState([]);
    useEffect(() => {
        (async () => {
            const post = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${loginData.id}`)
            SetTodoData(post.data)
        })()
    }, [loginData])
    return (
        <div>

            <Container>
                <Row>
                    {tododata.map(post =>
                        <Col sm={4}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.completed ? 'Completed' : 'Pending'}
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

export default Todos