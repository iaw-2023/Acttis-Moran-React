import { motion } from "framer-motion";
import TicketDetail from "./TicketDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderCard(props) {
  const { orderInfo } = props;
  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

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
        <span
          style={{ fontWeight: 600 }}
          className="userorders__container__body__results__order__top__text"
        >
          Order #{orderInfo.order_id}
        </span>
        <span className="userorders__container__body__results__order__top__text">
          Checkout Date : {orderInfo.checkout_date}
        </span>
        <span className="userorders__container__body__results__order__top__text">
          Total Order Price :{" "}
          <span
            style={{
              color: cssVariables.getPropertyValue("--price-color"),
              fontWeight: 400,
            }}
          >
            ${orderInfo.total_price}
          </span>
        </span>
        <FontAwesomeIcon
          icon="fa-solid fa-file-invoice-dollar"
          style={{ color: "#d6c7b5" }}
        />
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
        {orderInfo?.state === "unconfirmed" ? (
          <button className="userorders__container__body__results__order__bottom__pay-button" onClick={()=>{props.onSelectOrder(orderInfo)}}>
            Pay Order
          </button>
        ) : (
          <span className="userorders__container__body__results__order__bottom__paid-order-advice">
            Paid Order!
          </span>
        )}
      </div>
    </motion.div>
  );
}
