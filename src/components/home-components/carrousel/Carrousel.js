import ImageSlider from "./ImageSlider";
import "../../../css/carrousel.css";

export default function Carrousel(props) {
  const slides = [
    { url: "/images/carrousel-images/stadium1.jpg", title: "beach" },
    { url: "/images/carrousel-images/stadium2.jpg", title: "boat" },
    { url: "/images/carrousel-images/stadium3.jpg", title: "forest" },
  ];

  return (
    <div className="carrousel-container">
      <div className="carrousel-item-container">
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
}
