import React from "react";
import { Carousel } from "react-bootstrap";
import "../../css/carousel.css";

export default function StadiumsCarousel() {
  const slides = [
    { url: "/images/carrousel-images/camp-nou.jpg" },
    { url: "/images/carrousel-images/allianz-arena.jpg" },
    { url: "/images/carrousel-images/old-trafford.jpg" },
    { url: "/images/carrousel-images/santiago-bernabeu.jpg" },
    { url: "/images/carrousel-images/parc-des-princes.jpg" },
  ];

  return (
    <Carousel variant="dark" className="carrousel-container">
      <Carousel.Item interval={4000}>
        <img
          className="w-100 carrousel-container-item"
          src={slides[0].url}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="carrousel-container-item-title">Camp Nou, Spain</h3>
          <p className="carrousel-container-item-text">
            F.C. Barcelona stadium.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="w-100 carrousel-container-item"
          src={slides[1].url}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="carrousel-container-item-title">Allianz Arena</h3>
          <p className="carrousel-container-item-text">
            Bayern Munich FC stadium.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="w-100 carrousel-container-item"
          src={slides[2].url}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="carrousel-container-item-title">
            Old Trafford, England
          </h3>
          <p className="carrousel-container-item-text">
            Manchester United stadium.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="w-100 carrousel-container-item"
          src={slides[3].url}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="carrousel-container-item-title">
            Santiago Bernabeu, Spain
          </h3>
          <p className="carrousel-container-item-text"> Real Madrid stadium.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="w-100 carrousel-container-item"
          src={slides[4].url}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="carrousel-container-item-title">
            Parc des Princes, France
          </h3>
          <p className="carrousel-container-item-text">
            Paris Saint Germain stadium.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
