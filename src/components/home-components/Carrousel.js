import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import "../../css/carrousel.css";

export default function Carrousel() {
  const slides = [
    { url: "/images/carrousel-images/stadium1.jpg" },
    { url: "/images/carrousel-images/stadium2.jpg" },
    { url: "/images/carrousel-images/stadium3.jpg" },
  ];
  return (
    <MDBCarousel className="carrousel-container" showControls dealy={5000}>
      <MDBCarouselItem
        className="w-100 carrousel-container-item"
        itemId={1}
        src={slides[0].url}
        alt="..."
      />
      <MDBCarouselItem
        className="w-100 carrousel-container-item"
        itemId={2}
        src={slides[1].url}
        alt="..."
      />
      <MDBCarouselItem
        className="w-100 carrousel-container-item"
        itemId={3}
        src={slides[2].url}
        alt="..."
      />
    </MDBCarousel>
  );
}
