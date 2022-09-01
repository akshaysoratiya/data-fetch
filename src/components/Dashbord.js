import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Globalcontext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';




function Dashbord() {
    const { loginData } = useContext(GlobalContext);
    const [postCount, setPostCount] = useState(null);
    const [albumCount, setAlbumCount] = useState(null);
    const [todoCount, setTodoCount] = useState(null);

    // const postevent = async () => {
    //     const urlPost = `https://jsonplaceholder.typicode.com/posts?userId=2`
    //     await axios.get(urlPost).then((response) => setPostDetail(response.data[0]))
    //     setPostData(setPostDetail);
    // }

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const post = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${loginData.id}`)
                setPostCount(post.data.length);

                const albums = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${loginData.id}`)
                setAlbumCount(albums.data.length);

                const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${loginData.id}`)
                setTodoCount(todos.data.length);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAssets();
    }, [loginData])

    const navigate = useNavigate()
    const logout = async () => {
        localStorage.removeItem("loginData",loginData.id);
        navigate('/login');
    };

    return (
        <div>
            <Container>
                <Button className="col-md-2" onClick={() => logout()}>Logout</Button>
                <Row className="col-md-12 p-4">
                    <Col>
                        <Card.Header>Welcome {loginData.username}</Card.Header>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/posts')} > Posts - {postCount}</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/albums')} > Albums - {albumCount}</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/todos')} > Todos - {todoCount}</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Dashbord