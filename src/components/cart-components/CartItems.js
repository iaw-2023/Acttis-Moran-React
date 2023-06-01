import CartContext from "../../context/CartProvider";
import { useContext, useEffect, useState } from "react";
import CartRemoveTicketButton from "./CartRemoveTicketButton";
import {
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { toast } from "react-hot-toast";
import { getCartTicket } from "../../connection/requests";

const stadiumPhotosPath = "/images/stadium_photos/";

export default function CartItems(props) {
  const { cart, setCart } = useContext(CartContext);
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    if (cart.length !== 0) obtainCartTicketInfo();
  }, []);

  useEffect(() => {
    // When the checkout is made
    if (cart.length === 0) setTicketList([]);
  }, [cart]);

  const obtainCartTicketInfo = async () => {
    const retreiveCartTickets = {
      cart_tickets: [],
    };
    cart.map((ticket) => {
      retreiveCartTickets.cart_tickets.push({
        ticketId: ticket.ticket_id,
      });
    });
    const responseTicketsInfo = await getCartTicket(retreiveCartTickets);
    if (responseTicketsInfo.status === 200)
      matchTicketsWithQuantity(responseTicketsInfo.data.data);
    else toast.error("Error fetching the tickets.");
  };

  const matchTicketsWithQuantity = (ticketsInfo) => {
    const updatedTickets = [];
    ticketsInfo.map((ticket) => {
      let cartTicket = cart.find(
        (cartTicket) => cartTicket.ticket_id === ticket.ticket_id
      );
      updatedTickets.push({
        ticketInfo: ticket,
        quantity: cartTicket.quantity,
      });
    });
    setTicketList(updatedTickets);
  };

  const removeTicketFromCart = (ticketIdRemove) => {
    let updatedCart = [];
    let updatedTicketList = [];
    cart.map((ticket) => {
      if (ticket.ticket_id !== ticketIdRemove) {
        updatedCart.push(ticket);
      }
    });

    ticketList.map((ticket) => {
      if (ticket.ticketInfo.ticket_id !== ticketIdRemove)
        updatedTicketList.push(ticket);
    });

    setCart(updatedCart);
    setTicketList(updatedTicketList);

    toast.error("Ticket removed from cart.");
  };

  useEffect(() => {
    props.onChangeTotalPrice(getTotalPrice());
  }, [ticketList]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    ticketList.map(
      (ticket) =>
        (totalPrice +=
          (parseInt(ticket.ticketInfo.base_price) +
            parseInt(ticket.ticketInfo.zone.price_addition)) *
          parseInt(ticket.quantity))
    );

    return totalPrice;
  };

  return (
    <>
      {ticketList.map((ticket) => {
        return (
          <MDBCard key={ticket.ticketInfo.ticket_id} className="mb-3 cart-item">
            <MDBCardBody>
              <div className="d-flex justify-content-between cart__item">
                <div className="d-flex flex-row align-items-center cart__item__part">
                  <div>
                    <MDBCardImage
                      src={
                        stadiumPhotosPath +
                        ticket.ticketInfo.matchgame.stadium.stadium_name +
                        ".jpg"
                      }
                      fluid
                      className="rounded-3"
                      style={{ width: "65px" }}
                      alt="Shopping item"
                    />
                  </div>
                  <div className="ms-3 cart__item__text">
                    <MDBTypography className="cart__item__title" tag="h6">
                      {ticket.ticketInfo.zone.stadium_location}
                    </MDBTypography>
                    <p className="small mb-0">
                      <i>{ticket.ticketInfo.category}</i>
                    </p>
                    <p className="cart__item__teams small mb-0">
                      {ticket.ticketInfo.matchgame.team_one.team.team_name} vs{" "}
                      {ticket.ticketInfo.matchgame.team_two.team.team_name}
                    </p>
                    <p className="small mb-0">
                      {ticket.ticketInfo.matchgame.played_on_date +
                        " | " +
                        ticket.ticketInfo.matchgame.played_on_time}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center cart__item__part">
                  <div style={{ width: "50px" }}>
                    <MDBTypography tag="h6" className="fw-normal mb-0">
                      {ticket.quantity}
                    </MDBTypography>
                  </div>
                  <div style={{ width: "80px" }}>
                    <MDBTypography tag="h6" className="mb-0 cart__item__price">
                      {"$" +
                        (parseInt(ticket.ticketInfo.base_price) +
                          parseInt(ticket.ticketInfo.zone.price_addition))}
                    </MDBTypography>
                  </div>
                  <CartRemoveTicketButton
                    ticket_id={ticket.ticketInfo.ticket_id}
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
