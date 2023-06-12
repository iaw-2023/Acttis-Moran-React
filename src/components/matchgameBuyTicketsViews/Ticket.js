import { MDBListGroupItem } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

export default function Ticket(props) {
  const [selected, setSelected] = useState(false);
  const { ticketSelected } = props;

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  useEffect(() => {
    if (selected) props.onSelectTicket(props.ticket_id);
  }, [selected]);

  useEffect(() => {
    if (ticketSelected != props.ticket_id) {
      setSelected(false);
    }
  }, [ticketSelected]);

  const selectedStyle = {
    backgroundColor: cssVariables.getPropertyValue("--nav-enterprise-color"),
    color: cssVariables.getPropertyValue("--nav-color"),
  };

  const notSelectedStyle = {
    backgroundColor: cssVariables.getPropertyValue("--nav-color"),
    color: cssVariables.getPropertyValue("--nav-enterprise-color"),
  };

  return (
    <div
      onClick={() => {
        setSelected(true);
      }}
      className="ticket_info_data_item"
    >
      <div
        style={selected ? selectedStyle : notSelectedStyle}
        className="ticket_info_data_item_body ms-2 me-auto"
      >
        <div className="ticket_info_data_item_body_text fw-bold">
          {props.zone}
        </div>
        <span className="ticket_info_data_item_body_text">
          <i>{props.category}</i>
        </span>
        <span className="ticket_info_data_item_body_price">
          {"$" + props.total_price}
        </span>
      </div>
    </div>
  );
}
