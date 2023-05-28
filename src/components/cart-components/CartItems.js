import CartContext from "../../context/CartProvider";
import { useContext } from "react";
import CartRemoveTicketButton from "./CartRemoveTicketButton";
import {
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { toast } from "react-hot-toast";

const stadiumPhotosPath = "/images/stadium_photos/";

export default function CartItems() {
  const { cart, setCart } = useContext(CartContext);

  const removeTicketFromCart = (ticketIdRemove) => {
    let updatedCart = [];
    cart.map((ticket) => {
      if (ticket.ticket_id != ticketIdRemove) {
        updatedCart.push(ticket);
      }
    });

    setCart(updatedCart);

    toast.error("Ticket removed from cart.");
  };

  return (
    <>
      {cart.map((ticket) => {
        return (
          <MDBCard key={ticket.ticket_id} className="mb-3 cart-item">
            <MDBCardBody>
              <div className="d-flex justify-content-between cart__item">
                <div className="d-flex flex-row align-items-center cart__item__part">
                  <div>
                    <MDBCardImage
                      src={stadiumPhotosPath + ticket.stadium + ".jpg"}
                      fluid
                      className="rounded-3"
                      style={{ width: "65px" }}
                      alt="Shopping item"
                    />
                  </div>
                  <div className="ms-3">
                    <MDBTypography tag="h5">{ticket.zone}</MDBTypography>
                    <p className="small mb-0">
                      <i>{ticket.category}</i>
                    </p>
                    <p className="small mb-0">{ticket.matchgame}</p>
                    <p className="small mb-0">
                      {ticket.date + " | " + ticket.time}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center cart__item__part">
                  <div style={{ width: "50px" }}>
                    <MDBTypography tag="h5" className="fw-normal mb-0">
                      {ticket.quantity}
                    </MDBTypography>
                  </div>
                  <div style={{ width: "80px" }}>
                    <MDBTypography tag="h5" className="mb-0">
                      {"$" + ticket.price}
                    </MDBTypography>
                  </div>
                  <CartRemoveTicketButton
                    ticket_id={ticket.ticket_id}
                    onClick={(ticket_id) => {
                      removeTicketFromCart(ticket_id);
                    }}
                  ></CartRemoveTicketButton>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      })}
    </>
  );
}
