import "../../css/pagewrapper.css";
import { Link } from "react-router-dom";
import PageFooter from "./PageFooter";
import { MDBIcon } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartProvider";

export default function PageWrapper(props) {
  const { cart, setCart } = useContext(CartContext);
  const [cartInfoItems, setCartInfoItems] = useState(cart.length);
  const [navStyle, setNavStyle] = useState({});

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  useEffect(() => {
    setCartInfoItems(cart.length);
  }, [cart]);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    if (window.pageYOffset === 0) {
      setNavStyle(styleNavBarTransparent);
    } else {
      setNavStyle(styleNavBarSolid);
    }
  };

  const handleMouseOver = () => {
    setNavStyle(styleNavBarSolid);
  };

  const styleNavBarTransparent = {
    backgroundColor: cssVariables.getPropertyValue("--nav-color-transparent"),
    height: "4.5rem",
  };

  const styleNavBarSolid = {
    backgroundColor: cssVariables.getPropertyValue("--nav-color"),
  };

  return (
    <div className="page__container">
      <div id="page__background"></div>
      <section
        style={navStyle}
        className="page__wrapper__section"
        id="home__wrapper__section"
        onMouseOver={handleMouseOver}
      >
        <nav className="page__wrapper__navbar">
          <div className="page__wrapper__navbar__container">
            <div className="page__wrapper__navbar__enterpriseName">
              <Link className="nav__brand__link" to="/">
                <img
                  className="nav__brand__img"
                  src="/images/logo-youticket.png"
                ></img>
              </Link>
            </div>

            <ul className="page__wrapper__navbar__list">
              <li className="page__wrapper__navbar__list__item">
                <span className="page__wrapper__navbar__list__item__text">
                  Contact
                </span>
              </li>
            </ul>
          </div>
          <Link className="page__wrapper__navbar__cart" to="/">
            <MDBIcon
              className="page_wrapper__navbar__cart__icon"
              fas
              icon="shopping-cart"
            />
            <div className="home__nav__cart__icon__info">{cartInfoItems}</div>
          </Link>
        </nav>
      </section>
      {props.children}
      <PageFooter></PageFooter>
    </div>
  );
}
