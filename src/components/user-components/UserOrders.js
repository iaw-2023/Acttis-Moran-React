import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import OrdersResults from "./OrdersResults";

export default function UserOrders() {
  return (
    <div>
      <OrdersResults />
    </div>
  );
}
