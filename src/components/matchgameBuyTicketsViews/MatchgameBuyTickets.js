import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../css/matchgamebuytickets.css";
import CartContext from "../../context/CartProvider";
import { Toaster, toast } from "react-hot-toast";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import {
  getMatchTickets,
  getMatchgame,
  getStadiumZones,
} from "../../connection/requests";
import ZoneTickets from "./ZoneTickets";
import Stadium from "./Stadium";
import ZoneAdviceText from "./ZoneAdviceText";
import MatchgameInfo from "./MatchgameInfo";

export default function MatchgameBuyTickets() {
  const { state } = useLocation();
  const matchgame_id = state.matchgame_id;
  const stadium_id = state.stadium_id;
  const { cart, setCart } = useContext(CartContext);

  const [actualZone, setActualZone] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [matchTickets, setMatchTickets] = useState(null);
  const [stadiumZones, setStadiumZones] = useState(null);
  const [matchgame, setMatchgame] = useState(null);

  const getStartupData = async () => {
    const matchgameResponse = await getMatchgame(matchgame_id);
    if (matchgameResponse.status === 200)
      setMatchgame(matchgameResponse?.data?.data);
    else toast.error("Error getting information about matchgame.");

    const matchTicketsResponse = await getMatchTickets(matchgame_id);
    if (matchTicketsResponse.status === 200)
      setMatchTickets(matchTicketsResponse?.data?.data);
    else toast.error("Error getting information about matchgame tickets.");

    const stadiumZonesResponse = await getStadiumZones(stadium_id);
    if (stadiumZonesResponse.status === 200)
      setStadiumZones(stadiumZonesResponse?.data?.data);
    else toast.error("Error getting information about stadium zones.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getStartupData();
  }, []);

  const addToCart = () => {
    let updatedCart = [];
    const ticketToAdd = getSelectedTicketInfo();

    if (ticketToAdd !== null) {
      const existsTicketInCart = isTicketAlreadyInCart(ticketToAdd);

      if (existsTicketInCart) {
        //Only increase quantity of the ticketToAdd
        cart.map((ticket) => {
          if (ticket.ticket_id === ticketToAdd.ticket_id) {
            updatedCart.push({
              ...ticket,
              quantity: parseInt(ticket.quantity) + parseInt(quantity),
            });
          } else updatedCart.push(ticket);

          return 0;
        });
      } else {
        //Add all existing tickets
        cart.map((ticket) => {
          updatedCart.push(ticket);
          return 0;
        });

        //Now push the new ticket
        updatedCart.push({
          matchgame:
            matchgame.team_one.team.team_name +
            " vs " +
            matchgame.team_two.team.team_name,
          stadium: ticketToAdd.zone.stadium.stadium_name,
          date: matchgame.played_on_date,
          time: matchgame.played_on_time,
          zone: ticketToAdd.zone.stadium_location,
          ticket_id: ticketToAdd.ticket_id,
          quantity: quantity,
          category: ticketToAdd.category,
          price:
            parseInt(ticketToAdd.base_price) +
            parseInt(ticketToAdd.zone.price_addition),
        });
      }

      setCart(updatedCart);

      setQuantity(0);
      toast.success("Ticket succesfully added to the cart!");
    }
  };

  const getSelectedTicketInfo = () => {
    let ticket = null;
    if (matchTickets !== null)
      ticket = matchTickets.find(
        (ticket) => ticket.ticket_id === selectedTicket
      );

    return ticket;
  };

  const isTicketAlreadyInCart = (ticketToAdd) => {
    return cart.find((ticket) => ticket.ticket_id === ticketToAdd.ticket_id);
  };

  const showZoneInfo = (zone_code) => {
    const zone = getZoneByZoneCode(zone_code);
    if (zone !== null) setActualZone(zone);
    setSelectedTicket(0);
  };

  const getZoneByZoneCode = (zone_code) => {
    let zone = null;
    if (stadiumZones !== null)
      zone = stadiumZones.find((zone) => zone.zone_code === zone_code);

    return zone;
  };

  const selectTicket = (ticket_id) => {
    setSelectedTicket(ticket_id);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="section__matchgametickets__ticket__selection">
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>
      <div className="matchgametickets__ticket__selection">
        <MDBTypography
          tag="h5"
          className="matchgametickets__ticket__selection__back"
        >
          <Link to="/" className="text-body">
            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
          </Link>
        </MDBTypography>
        <div className="matchgametickets__ticket__selection__container">
          <MatchgameInfo matchgame={matchgame} />
          <ZoneAdviceText actualZone={actualZone} />
          <div className="matchgametickets__stadium__container">
            <Stadium
              showZoneInfo={(zone_code) => {
                showZoneInfo(zone_code);
              }}
            />
            <div className="ticket_info">
              <ZoneTickets
                id="ticket_list"
                actualZone={actualZone}
                matchgameTickets={matchTickets}
                onSelectTicket={(ticket_id) => {
                  selectTicket(ticket_id);
                }}
              ></ZoneTickets>
            </div>
          </div>
          <div className="ticket-info-quantity-button__container">
            <button
              className="ticket-info-button__button"
              onClick={() => {
                if (selectedTicket === 0 || quantity <= 0) {
                  toast.error(
                    "Need to choose a valid ticket and quantity greater than 0."
                  );
                } else addToCart();
              }}
            >
              Add to cart
            </button>
            <input
              type="number"
              className="ticket_info_data_item__input"
              value={quantity}
              onChange={(e) => handleChangeQuantity(e)}
              min={0}
            ></input>
            <label>Quantity</label>
          </div>
        </div>
      </div>
    </div>
  );
}