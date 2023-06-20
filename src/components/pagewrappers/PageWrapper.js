import "../../css/pagewrapper.css";
import { Link } from "react-router-dom";
import PageFooter from "./PageFooter";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartProvider";
import useAuth from "../../hooks/useAuth";

export default function PageWrapper(props) {
  const { auth, logOutAuth } = useAuth();
  const { cart } = useContext(CartContext);
  const [cartInfoItems, setCartInfoItems] = useState(cart.length);
  const [navStyle, setNavStyle] = useState({});

  const [loginRegisterAccess, setLoginRegisterAccess] = useState([]);

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

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
  }, [auth]);

  const logout = async () => {
    logOutAuth();
  };

  const verifyLoginRegisterAccess = () => {
    if (!auth?.accessToken) {
      setLoginRegisterAccess([
        <div key={1} className="page__wrapper__navbar__list__item-account">
          <Link
            to="/login"
            className="page__wrapper__navbar__list__item__account__link"
          >
            <i class="fas fa-user page__wrapper__navbar__list__item-account__icon"></i>
          </Link>
        </div>,
      ]);
    } else {
      setLoginRegisterAccess([
        <MDBDropdown className="page__wrapper__navbar__list__item-account">
          <MDBDropdownToggle tag="a" className="nav-link" role="button">
            <i class="fas fa-user-tag page__wrapper__navbar__list__item-account__icon"></i>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem className="page__wrapper__navbar__list__item-account__dropdown-item">
              <Link
                className="page__wrapper__navbar__list__item-account__dropdown-link"
                to="/userorders"
              >
                My Orders
              </Link>
            </MDBDropdownItem>
            <MDBDropdownItem
              className="page__wrapper__navbar__list__item-account__dropdown-item"
              onClick={() => logout()}
            >
              <span className="page__wrapper__navbar__list__item-account__dropdown-link-logout">
                Logout
              </span>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>,
      ]);
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
            <li className="page__wrapper__navbar__list__item__user-block">
              {loginRegisterAccess}
              <div className="page__wrapper__navbar__list__item-cart" key={3}>
                <Link className="page__wrapper__navbar__cart" to="/cart">
                  <i class="fab fa-opencart page_wrapper__navbar__cart__icon"></i>
                  <div className="home__nav__cart__icon__info">
                    {cartInfoItems}
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </section>
      {props.children},<PageFooter></PageFooter>
    </div>
  );
}
