import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Userlogin from './components/Userlogin';
import Dashbord from './components/Dashbord';
import { GlobalContext } from './context/Globalcontext';
import Posts from './components/Posts';
import Todos from './components/Todos';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Comments from './components/Comments';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoutes from './Util/PrivateRoutes';

function App() {
  const [loginData, setloginData] = useState(localStorage.loginData ? JSON.parse(localStorage.loginData) : {});
  const setUserDetails = (data) => {
    setloginData(data)
    localStorage.setItem('loginData', JSON.stringify(data))
  }
  // const [postData, setPostData] = useState(localStorage.postData ? JSON.parse(localStorage.postData) : {});
  // const setPostDetail = (post) => {
  //   setPostData(post)
  //   localStorage.setItem("PostData", JSON.stringify(post))
  // }
  return (
    <>
      <GlobalContext.Provider value={
        {
          loginData,
          setUserDetails,
          // postData,
          // setPostDetail
        }
      }>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/dashboard" element={<Dashbord />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/photos" element={<Photos />} />
            </Route>
            <Route path="/login" element={<Userlogin />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
