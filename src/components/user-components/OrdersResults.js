import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import OrderCard from "./OrderCard";

export default function OrdersResults() {
  const [userOrders, setUserOrders] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
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
      <span className="home__body__results__text">{infoText}</span>
      <motion.div layout className="home__body__results">
        <AnimatePresence>
          {userOrders.map((order) => {
            return (
              <OrderCard
                key={matchgame.matchgame_id}
                id={matchgame.matchgame_id}
                stadiumId={matchgame.stadium.stadium_id}
                stadiumName={matchgame.stadium.stadium_name}
                date={matchgame.played_on_date}
                time={matchgame.played_on_time}
                homeTeamName={matchgame.team_one.team.team_name}
                awayTeamName={matchgame.team_two.team.team_name}
              ></OrderCard>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
