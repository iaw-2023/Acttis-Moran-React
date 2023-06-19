import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import OrderCard from "./OrderCard";
import { getUserOrders } from "../../connection/requests";

export default function OrdersResults() {
  const [userOrders, setUserOrders] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    obtainUserOrders();
  }, []);

  const obtainUserOrders = async () => {
    getUserOrders(auth?.accessToken)
      .then((response) => {
        setUserOrders(response.data.data);
      })
      .catch(() => {
        setUserOrders([]);
        toast.error("There was a problem loading user Orders.");
      });
  };
  return (
    <>
      <motion.div layout className="userorders__container__body__results">
        <AnimatePresence>
          {userOrders.length !== 0 ? (
            userOrders.map((order) => {
              return (
                <OrderCard
                  key={order.order_id}
                  id={order.order_id}
                  orderInfo={order}
                ></OrderCard>
              );
            })
          ) : (
            <span className="userorders__container__body__results_advice-text">
              You have no orders!
            </span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
