import "../../css/pagewrapper.css";
import { useNavigate, Link } from "react-router-dom";
import PageFooter from "./PageFooter";
import { MDBIcon } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartProvider";
import useAuth from "../../hooks/useAuth";

export default function PageWrapper(props) {
  const { auth, setAuth, logOutAuth } = useAuth();
  const { cart, setCart } = useContext(CartContext);
  const [cartInfoItems, setCartInfoItems] = useState(cart.length);
  const [navStyle, setNavStyle] = useState({});

  const [logoutAccess, setLogoutAccess] = useState([]);
  const [loginRegisterAccess, setLoginRegisterAccess] = useState([]);

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  const navigate = useNavigate();

  useEffect(() => {
    setCartInfoItems(cart.length);
  }, [cart]);

  useEffect(() => {
    setNavStyle(styleNavBarTransparent);
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    verifyLoginRegisterAccess();
    verifyLogoutAccess();
  }, [auth]);

  const logout = async () => {
    logOutAuth();
  };

  const verifyLoginRegisterAccess = () => {
    if (!auth?.accessToken) {
      setLoginRegisterAccess([
        <li key={1} className="page__wrapper__navbar__list__item">
          <Link to="/login" className="page__wrapper__navbar__list__item__text">
            Login
          </Link>
        </li>,
        <li key={2} className="page__wrapper__navbar__list__item">
          <Link
            to="/register"
            className="page__wrapper__navbar__list__item__text"
          >
            Register
          </Link>
        </li>,
      ]);
    } else {
      setLoginRegisterAccess([]);
    }
  };

  const verifyLogoutAccess = () => {
    if (auth?.accessToken) {
      setLogoutAccess([
        <li key={1} className="page__wrapper__navbar__list__item">
          <Link
            className="page__wrapper__navbar__list__item__text"
            onClick={() => logout()}
          >
            Logout
          </Link>
        </li>,
      ]);
    } else {
      setLogoutAccess([]);
    }
  };

  const listenToScroll = () => {
    if (window.pageYOffset <= 50) {
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
          </div>

          <ul className="page__wrapper__navbar__list">
            {loginRegisterAccess},{logoutAccess},
          </ul>
        </nav>
      </section>
      {props.children},
      <Link className="page__wrapper__navbar__cart" to="/cart">
        <MDBIcon
          className="page_wrapper__navbar__cart__icon"
          fas
          icon="shopping-cart"
        />
        <div className="home__nav__cart__icon__info">{cartInfoItems}</div>
      </Link>
      <PageFooter></PageFooter>
    </div>
  );
}
