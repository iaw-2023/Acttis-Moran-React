import "../../css/pagewrapper.css";
import { Link } from "react-router-dom";
import PageFooter from "./PageFooter";
import { MDBIcon } from "mdb-react-ui-kit";

export default function PageWrapper(props) {
  return (
    <div className="page__container">
      <div id="page__background"></div>
      <section className="page__wrapper__section" id="home__wrapper__section">
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
          </Link>
        </nav>
      </section>
      {props.children}
      <PageFooter></PageFooter>
    </div>
  );
}
