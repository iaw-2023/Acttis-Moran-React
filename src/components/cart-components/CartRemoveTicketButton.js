import { MDBIcon } from "mdb-react-ui-kit";

export default function CartRemoveTicketButton(props) {
  return (
    <button
      style={{ border: "none", color: "#cecece" }}
      onClick={() => {
          console.log(props.ticket_id)
        props.onClick(props.ticket_id);
      }}
    >
      <MDBIcon
        className="cart-container__section__content__item__remove-icon"
        fas
        icon="trash-alt"
      />
    </button>
  );
}
