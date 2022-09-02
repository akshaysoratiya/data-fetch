import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/Globalcontext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';




function Userlogin() {
    // const [users, setUsers] = useState({});
    const [email, setEmail] = useState();
    const { loginData, setUserDetails } = useContext(GlobalContext);
    const navigate = useNavigate()
    const login = async () => {

        const url = `https://jsonplaceholder.typicode.com/users?email=${email}`;
        axios.get(url).then((responce) => setUserDetails(responce.data[0]));
        navigate('/dashboard');

    };

    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup className="p-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control onChange={e => setEmail(e.target.value)}
                            placeholder="Enter email"
                            aria-label="Enter email"
                            aria-describedby="basic-addon1" 
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="p-3 justify-content-center">
                <Button className="col-md-2" onClick={() => login()}>Login</Button>
            </Row>
        </Container>
        // <div>
        //     {console.log("Data", loginData)}
        //     <div className="container" >
        //         <div className="col-md-12 mt-5">
        //             <div className="mb-3">
        //                 <input id="users" type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        //                 <button variant="primary" type="submit" onClick={() => login()} > Submit</button>
        //                 {/* <h2>{console.log("users data", users)}</h2> */}

        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Userlogin
