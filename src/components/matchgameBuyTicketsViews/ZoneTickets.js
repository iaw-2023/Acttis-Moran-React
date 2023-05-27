import Ticket from "./Ticket";
import { useEffect, useState } from "react";

export default function ZoneTickets(props) {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [zoneTickets, setZoneTickets] = useState([]);

  const { actualZone, matchgameTickets } = props;

  const getZoneTickets = () => {
    let zoneTickets = [];
    matchgameTickets.map((ticket) => {
      if (ticket.zone.zone_code == actualZone.zone_code)
        zoneTickets.push(ticket);
    });

    setZoneTickets(zoneTickets);
  };

  useEffect(() => {
    getZoneTickets();
    setTicketSelected(0);
  }, [actualZone]);

  useEffect(() => {
    props.onSelectTicket(ticketSelected);
  }, [ticketSelected]);

  return (
    <div className="ticket-info-data">
      <ul className="ticket-info-data-ticketlist">
        {zoneTickets.length == 0 ? (
          <span className="ticket-info-data-ticketlist-error-text">
            No tickets
          </span>
        ) : (
          zoneTickets.map((ticket) => {
            return (
              <Ticket
                key={ticket.ticket_id}
                ticket_id={ticket.ticket_id}
                ticketSelected={ticketSelected}
                zone={ticket.zone.stadium_location}
                category={ticket.category}
                total_price={
                  parseInt(ticket.base_price) +
                  parseInt(ticket.zone.price_addition)
                }
                onSelectTicket={(ticket_id) => {
                  setTicketSelected(ticket_id);
                }}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}
