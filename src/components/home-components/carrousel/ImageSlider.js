import { useEffect, useState } from "react";

export default function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const imageEl = document.getElementById("slideStylesWidthBackground");
    imageEl.style.backgroundImage = `url(${slides[currentIndex].url})`;
  }, [currentIndex]);

  const autoSlide = async () => {
    await delay(5000);
    goToNext();
  };

  autoSlide();

  return (
    <div className="sliderStyles">
      <div id="slideStylesWidthBackground"></div>
    </div>
  );
}
