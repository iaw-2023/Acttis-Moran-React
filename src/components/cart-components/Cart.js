import React, { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../context/CartProvider";
import "../../css/cart.css";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { toast } from "react-hot-toast";
import { postCheckout } from "../../connection/requests";
import CartItems from "./CartItems";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [totalPrice, setTotalPrice] = useState(0);

  const [checkoutDisabled, setCheckoutDisabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const makeCheckout = async () => {
    const retreiveCartTickets = {
      tickets_purchased: [],
    };
    cart.map((ticket) => {
      retreiveCartTickets.tickets_purchased.push({
        ticketId: ticket.ticket_id,
        quantity: parseInt(ticket.quantity),
      });
    });

    toast.promise(postCheckout(auth?.accessToken, retreiveCartTickets), {
      loading: "Making Order...",
      success: () => {
        setCart([]);
        setCheckoutDisabled(false);
        return (
          <span>
            The order has been succesfully made, look at it in "My Orders" menu!
          </span>
        );
      },
      error: () => {
        setCheckoutDisabled(false);
        return <b>There was an error while making checkout!</b>;
      },
    });
  };

  return (
    <div className="cart-container">
      <section className="h-custom cart-container__section">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow className="cart-container__info">
                    <MDBCol className="cart-container__section__content" lg="7">
                      <MDBTypography
                        className="cart__container__section__back"
                        tag="h5"
                      >
                        <Link to="/" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                          Continue shopping
                        </Link>
                      </MDBTypography>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {cart.length} items in your cart
                          </p>
                        </div>
                      </div>
                      <CartItems
                        onChangeTotalPrice={(totalPrice) => {
                          setTotalPrice(totalPrice);
                        }}
                      />
                    </MDBCol>
                    <MDBCol lg="5" className="">
                      <MDBCard className="text-white rounded-3">
                        <MDBCardBody className="cart__client__details">
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total</p>
                            <p className="mb-2 cart__checkout__text__price">
                              ${totalPrice}
                            </p>
                          </div>
                          <hr />
                          <div className="cart__checkout__container">
                            {auth?.accessToken ? (
                              <button
                                disabled={checkoutDisabled}
                                onClick={() => {
                                  setCheckoutDisabled(true);
                                  makeCheckout();
                                }}
                                className="cart__checkout__button"
                              >
                                <span className="cart__checkout__button__text">
                                  Make Order!
                                </span>
                              </button>
                            ) : (
                              <div className="cart__checkout__auth-container">
                                <span className="cart__checkout__auth-container__text">
                                  You need to be logged in to make the order!
                                </span>
                                <button
                                  className="cart__checkout__auth-container__button"
                                  onClick={() => {
                                    navigate("/login", {
                                      state: { from: location },
                                    });
                                  }}
                                >
                                  Go to LogIn
                                </button>
                              </div>
                            )}
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
