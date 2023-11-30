import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome } from "react-icons/fa";

function Breadcrum() {
  return (
    <>
    <div className="breadgram">
    <Breadcrumb>
      <Breadcrumb.Item href="#"><FaHome /></Breadcrumb.Item>
      <Breadcrumb.Item active>Browse Listings</Breadcrumb.Item>
    </Breadcrumb>
    </div>
    </>
  )
}

export default Breadcrum