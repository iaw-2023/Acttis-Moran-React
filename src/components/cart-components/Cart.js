import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartProvider";
import "../../css/cart.css";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Toaster, toast } from "react-hot-toast";
import { postCheckout } from "../../connection/requests";
import CartItems from "./CartItems";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [clientEmail, setClientEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    obtainTotalPrice();
  }, [cart]);

  const obtainTotalPrice = () => {
    let acummulatedPrice = 0;
    cart.map((ticket) => {
      acummulatedPrice += parseInt(ticket.price) * parseInt(ticket.quantity);
    });

    setTotalPrice(acummulatedPrice);
  };

  const handleChange = (e) => {
    setClientEmail(e.target.value);
  };

  const makeCheckout = async () => {
    const retreiveCartTickets = {
      client_data: { client_email: clientEmail },
      tickets_purchased: [],
    };
    cart.map((ticket) => {
      retreiveCartTickets.tickets_purchased.push({
        ticketId: ticket.ticket_id,
        quantity: parseInt(ticket.quantity),
      });
    });

    const responseCheckout = await postCheckout(retreiveCartTickets);

    if (responseCheckout.status === 200) {
      setCart([]);
      toast.success("The order has been succesfully made!");
    } else
      toast.error(
        "The next error has ocurred while making checkout : " +
          responseCheckout.response.data.error
      );
  };

  return (
    <div className="cart-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <section className="h-custom cart-container__section">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
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
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                              Client details
                            </MDBTypography>
                            <a href="" className="text-body">
                              <MDBIcon
                                className="cart__client__details__icon"
                                fas
                                icon="user-tie mt-1"
                              />
                            </a>
                          </div>

                          <form className="mt-4">
                            <label>Client's Email</label>
                            <MDBInput
                              className="mb-4"
                              type="text"
                              size="lg"
                              placeholder="Email"
                              value={clientEmail}
                              onChange={handleChange}
                              contrast
                            ></MDBInput>
                          </form>

                          <hr />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total</p>
                            <p className="mb-2 cart__checkout__text__price">
                              ${totalPrice}
                            </p>
                          </div>
                          <div className="cart__checkout__container">
                            <button
                              onClick={() => {
                                makeCheckout();
                              }}
                              className="cart__checkout__button"
                            >
                              <span className="cart__checkout__button__text">
                                CheckOut
                              </span>
                            </button>
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
