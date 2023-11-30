import React from "react";
import Navbar from "../components/navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Product1 from '../assest/product1.jpeg';
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductDetail() {
    const navigate = useNavigate();
  const hanldeBidNow = () => {
    toast.success(`Bid Successfully.`);
    navigate("/home")
  }
    
  return (
    <>
      <div className="product-detail">
        <div className="details">
          <div className="navbar-product-detail-page">
            <Navbar />
          </div>
          <div className="crums">
            <div className="breadgram">
              <Breadcrumb>
                <Breadcrumb.Item href="#">
                  <FaHome />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Browse Listings</Breadcrumb.Item>
                <Breadcrumb.Item active>Headphones</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="again-two-option">
          <div className="product-heading">
            <h2>Headphones</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              illo inventore. Voluptate facere accusamus voluptatibus. Repellat
              nisi iste vel praesentium saepe officia vero maiores, animi harum
              sequi porro voluptates, temporibus doloribus eveniet nesciunt
              rerum necessitatibus in dignissimos quam doloremque dolores maxime
              fugit non tempore? Ipsam incidunt accusantium atque quaerat magni!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officia molestias odit optio facere, consequuntur rem cupiditate obcaecati ut dolore, commodi id in nesciunt quasi hic aspernatur, minima sequi. Deserunt illo illum cupiditate molestias, inventore maiores soluta exercitationem non eos et provident placeat, blanditiis id pariatur consequuntur rerum suscipit voluptatem.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam laboriosam perspiciatis odio ullam autem, sint quod eum quisquam consectetur totam ratione? Repellat autem provident, fugit iste animi ex fugiat ipsa odit sed, blanditiis soluta laudantium facilis voluptates aliquid excepturi ipsum et? Tempore incidunt eius reprehenderit velit iusto deleniti tenetur quis!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A eaque corporis architecto illo quis. Nihil reiciendis natus reprehenderit excepturi sequi?
            </p>
            <hr className="hr1" />
            <div className="price-detail">
              <h5>Price</h5>
              <p>$20.00</p>
            </div>
            <hr className="hr1" />
            <div className="seller-detail">
              <h5>Seller</h5>
              <p>user@gmail.com</p>
            </div>
            <hr className="hr1" />
            <div className="time-detail">
              <h5>time left</h5>
              <p>27D 17h 53m 5s</p>
            </div>
            <div className="bid-now">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  placeholder="Amount to bid"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <button onClick={hanldeBidNow}>bid now</button>
              </InputGroup>
            </div>
          </div>
          <div className="image-product">
            <img src={Product1} alt="image" />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
