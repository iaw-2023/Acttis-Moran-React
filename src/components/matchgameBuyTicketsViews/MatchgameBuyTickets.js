import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../css/matchgamebuytickets.css";
import CartContext from "../../context/CartProvider";
import { toast } from "react-hot-toast";
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
    getMatchgame(matchgame_id)
      .then((matchgameResponse) => {
        setMatchgame(matchgameResponse.data.data);
      })
      .catch((error) => {
        toast.error("Error getting information about matchgame.");
      });

    getMatchTickets(matchgame_id)
      .then((matchTicketsResponse) => {
        setMatchTickets(matchTicketsResponse.data.data);
      })
      .catch((error) => {
        toast.error("Error getting information about matchgame tickets.");
      });

    getStadiumZones(stadium_id)
      .then((stadiumZonesResponse) => {
        setStadiumZones(stadiumZonesResponse.data.data);
      })
      .catch((error) => {
        toast.error("Error getting information about stadium zones.");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getStartupData();
  }, []);

  const addToCart = () => {
    let updatedCart = [];
    if (selectedTicket !== 0) {
      if (isTicketAlreadyInCart(selectedTicket)) {
        //Only increase quantity of the ticketToAdd
        cart.map((ticket) => {
          if (ticket.ticket_id === selectedTicket) {
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
          ticket_id: selectedTicket,
          quantity: quantity,
        });
      }

      setCart(updatedCart);

      setQuantity(0);
      toast.success("Ticket succesfully added to the cart!");
    }
  };

  const isTicketAlreadyInCart = () => {
    return cart.find((ticket) => ticket.ticket_id === selectedTicket);
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
      <div className="matchgametickets__ticket__selection">
        <div className="matchgametickets__ticket__selection__back">
          <MDBTypography
            tag="h5"
            className="matchgametickets__ticket__selection__back__link"
          >
            <Link to="/" className="text-body">
              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
            </Link>
          </MDBTypography>
        </div>

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
