import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import TicketDetail from "./TicketDetail";

const stadiumPhotosPath = "/images/stadium_photos/";
const teamLogosPath = "/images/team_logos/";

export default function OrderCard(props) {
  const { orderInfo } = props;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="userorders__container__body__results__order"
    >
      <div className="userorders__container__body__results__order__top">
        <span className="userorders__container__body__results__order__top__text">
          Order #{orderInfo.order_id}
        </span>
        <span className="userorders__container__body__results__order__top__text">
          Checkout Date : {orderInfo.checkout_date}
        </span>
        <span className="userorders__container__body__results__order__top__text">
          Total Order Price : ${orderInfo.total_price}
        </span>
      </div>
      <ul className="userorders__container__body__results__order__ticketdetails-container">
        {orderInfo.tickets_details.map((ticketDetail) => {
          return (
            <TicketDetail
              key={ticketDetail.ticket_detail_id}
              ticketDetailInfo={ticketDetail}
            ></TicketDetail>
          );
        })}
      </ul>
      <div className="userorders__container__body__results__order__bottom">
        <button className="userorders__container__body__results__order__bottom__pay-button">
          Pay Order
        </button>
      </div>
    </motion.div>
  );
}
