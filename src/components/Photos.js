import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Globalcontext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import ReactPaginate from 'react-paginate';
import '../css/photos.css';


function Photos() {
  const { loginData } = useContext(GlobalContext);
  const [photodata, SetPhotoData] = useState([]);
  const [pagenumber, SetPagenumber] = useState(0);
  let { search } = useLocation()
  let { albumId ,page } = queryString.parse(search)
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      // const post = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${albumId}`)
      // Promise.all(post.data.map(r => axios.get(`https://jsonplaceholder.typicode.com/photos?albums=${r.id}`).then(res => { SetPhotoData(res.data) }))
      // )
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      SetPhotoData(res.data)
      SetPagenumber(page);
    })()
  }, [loginData])

  const photosPerPage = 10;
  const pagevisited = pagenumber * photosPerPage;
  const displayphotos = photodata.slice(pagevisited, pagevisited + photosPerPage).map((photodata) => {
    return (
      <Col>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={photodata.url} />
          <Card.Body>
            <Card.Title>{photodata.title}</Card.Title>
            <Card.Text>
              {photodata.url}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });
  const pageCount = Math.ceil(photodata.length / photosPerPage)
  const changePage = ({ selected }) => {
    SetPagenumber(selected+1);
    navigate(`/photos?albumId=${albumId}&page=${selected+1}`)

  };


  return (
    <div className="App">
      <Container>
        <Row>
          {displayphotos}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            forcePage={page ? page - 1 : 0}
            renderOnZeroPageCount={null}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </Row>
      </Container>
    </div>
  )
}

export default Photos