import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Albums() {
    const { loginData } = useContext(GlobalContext);
    const [albumdata, SetAlbumData] = useState([]);
    // const [photodata, SetPhotoData] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            const post = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${loginData.id}`)
            // SetAlbumData(post.data)
            // const photo = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${loginData.id}`)
            // SetPhotoData(photo.data.length)
            Promise.all(post.data.map(r => axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${r.id}`).then(res => ({ ...r, photoCount: res.data.length })))
            ).then(data => {
                SetAlbumData(data);
            })()
        })()
    }, [loginData])


    return (
        <div>
            <Container>
                <Row>
                    {albumdata.map(post =>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Button onClick={() => navigate(`/photos?albumId=${post.id}`)}>Photos - {post.photoCount}</Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}   

export default Albums