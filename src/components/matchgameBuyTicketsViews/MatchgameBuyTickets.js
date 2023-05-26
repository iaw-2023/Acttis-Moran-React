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

  const [actualZone, setActualZone] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [matchTickets, setMatchTickets] = useState([]);
  const [stadiumZones, setStadiumZones] = useState([]);
  const [matchgame, setMatchgame] = useState([]);

  const getStartupData = async () => {
    const matchgameResponse = await getMatchgame(matchgame_id);
    if (matchgameResponse.status == 200)
      setMatchgame(matchgameResponse?.data?.data);

    const matchTicketsResponse = await getMatchTickets(matchgame_id);
    if (matchTicketsResponse.status == 200)
      setMatchTickets(matchTicketsResponse?.data?.data);

    const stadiumZonesResponse = await getStadiumZones(stadium_id);
    if (stadiumZonesResponse.status == 200)
      setStadiumZones(stadiumZonesResponse?.data?.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getStartupData();
  }, []);

  const addToCart = () => {
    let updatedCart = [];
    const existsTicket = cart.find(
      (ticket) => ticket.ticket_id === selectedTicket.ticket_id
    );
    if (existsTicket) {
      cart.map((ticket) => {
        if (ticket.ticket_id === selectedTicket.ticket_id) {
          updatedCart.push({
            ...ticket,
            quantity: parseInt(ticket.quantity) + parseInt(quantity),
          });
        } else updatedCart.push(ticket);
      });
    } else {
      cart.map((ticket) => {
        updatedCart.push(ticket);
      });
      updatedCart.push({
        matchgame:
          matchgame.team_one.team.team_name +
          " vs " +
          matchgame.team_two.team.team_name,
        stadium: selectedTicket.zone.stadium.stadium_name,
        date: matchgame.played_on_date,
        time: matchgame.played_on_time,
        zone: selectedTicket.zone.stadium_location,
        ticket_id: selectedTicket.ticket_id,
        quantity: quantity,
        category: selectedTicket.category,
        price:
          parseInt(selectedTicket.base_price) +
          parseInt(selectedTicket.zone.price_addition),
      });
    }
    setCart(updatedCart);
    setQuantity(0);
    toast.success("Ticket succesfully added to the cart!");
  };

  const showZoneInfo = (zone_code) => {
    const zone = getZoneByZoneCode(zone_code);
    setActualZone(zone);
    setSelectedTicket([]);
  };

  const getZoneByZoneCode = (zone_code) => {
    const stadiumZone = stadiumZones.find(
      (zone) => zone.zone_code == zone_code
    );

    return stadiumZone;
  };

  const selectTicket = (ticket_id) => {
    const ticketClicked = matchTickets.find(
      (ticket) => ticket.ticket_id == ticket_id
    );
    setSelectedTicket(ticketClicked);
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
              <div className="ticket-info-data">
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
          </div>
          <div className="ticket-info-quantity-button__container">
            <button
              className="ticket-info-button__button"
              onClick={() => {
                if (selectedTicket == null || quantity <= 0) {
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
