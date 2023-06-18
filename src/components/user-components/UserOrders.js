import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import OrdersResults from "./OrdersResults";
import "../../css/userorders.css";

export default function UserOrders() {
  return (
    <div className="userorders__container">
      <div className="userorders__container__body">
        <OrdersResults />
      </div>
    </div>
  );
}
