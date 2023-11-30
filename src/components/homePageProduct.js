import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
import {useNavigate } from 'react-router-dom'
import Image from "../assest/image.png";

function HomePageProduct() {
    const data = [
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-03.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-03-image-card-01.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-03-image-card-02.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-03-image-card-03.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
        {
          id: 1,
          name: 'Product1',
          href: '/product-detail',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
          imageAlt: "product3",
          price: '$35',
          quantity: '10 in stock',
        },
      ]
      const navigate = useNavigate();
      const navigateAuction = () => {
        navigate('/auction')
      }
  return (
    <>
      <div className="home-page-product">
        <div className="product-page">
          <div className="new_product">
            <div className="crums">
              <div className="breadgram">
                <Breadcrumb>
                  <Breadcrumb.Item href="#">
                    <FaHome />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div className="trending-product">  
              <div className="trend">
                <div className="trend-heading">
                  <h1 className="trending">Trending List:</h1>
                </div>
                <div className="tags">
                  <div className="headphone_tag" onClick={navigateAuction}>
                    <button className="headphone">Headphones</button>
                  </div>
                  <div className="mobile_tag" onClick={navigateAuction}>
                    <button className="mobile">Mobiles</button>
                  </div>
                </div>
                <div className="trend-banner">
                  <img src={Image} alt="banner image" className="trend-image" />
                </div>
                <div className="products-trend">
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {data.map((item) => (
                          <div key={item.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <a href={item.href}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {item.name}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.quantity}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageProduct;
