import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import OrdersResults from "./OrdersResults";
import "../../css/userorders.css";

export default function UserOrders() {
  return (
    <div className="userorders__container">
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
      <span className="userorders__container__advice-text">
        Pay your existing orders here!
      </span>
      <div className="userorders__container__body">
        <OrdersResults />
      </div>
    </div>
  );
}
