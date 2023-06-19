export default function TicketDetail(props) {
  const { ticketDetailInfo } = props;
  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  return (
    <div className="userorders__container__body__results__order__ticketdetails-container__item">
      <div className="userorders__container__body__results__order__ticketdetails-container__item__body">
        <span
          style={{ fontWeight: 400 }}
          className="userorders__container__body__results__order__ticketdetails-container__item__body__text"
        >
          {ticketDetailInfo.ticket_associated.matchgame.team_one.team.team_name}{" "}
          vs{" "}
          {ticketDetailInfo.ticket_associated.matchgame.team_two.team.team_name}
        </span>
        <span className="userorders__container__body__results__order__ticketdetails-container__item__body__text">
          {ticketDetailInfo.ticket_associated.zone.stadium_location}
        </span>
        <span className="userorders__container__body__results__order__ticketdetails-container__item__body__text">
          {ticketDetailInfo.ticket_associated.matchgame.played_on_date} |{" "}
          {ticketDetailInfo.ticket_associated.matchgame.played_on_time}
        </span>
        <span className="userorders__container__body__results__order__ticketdetails-container__item__body__text">
          Category : {ticketDetailInfo.ticket_associated.category}
        </span>
        <span className="userorders__container__body__results__order__ticketdetails-container__item__body__text">
          Ticket total price :{" "}
          <span
            style={{ color: cssVariables.getPropertyValue("--price-color") }}
          >
            ${" "}
            {parseInt(ticketDetailInfo.ticket_associated.zone.price_addition) +
              parseInt(ticketDetailInfo.ticket_associated.base_price)}
          </span>
        </span>
        <span className="userorders__container__body__results__order__ticketdetails-container__item__body__text">
          Quantity : {ticketDetailInfo.ticket_quantity}
        </span>
      </div>
    </div>
  );
}
