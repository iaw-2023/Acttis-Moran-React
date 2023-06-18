import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import OrderCard from "./OrderCard";
import { getUserOrders } from "../../connection/requests";

export default function OrdersResults() {
  const [userOrders, setUserOrders] = useState([]);
  const { auth } = useAuth();

  const data = {
    data: [
      {
        order_id: 6,
        total_price: "27696",
        checkout_date: "2023-06-18",
        tickets_details: [
          {
            ticket_detail_id: 26,
            ticket_quantity: 13,
            ticket_associated: {
              ticket_id: 110,
              category: "Basic",
              base_price: "800",
              zone: {
                zone_id: 73,
                stadium_location: "Estadio do Dragao North Upper Stand",
                zone_code: "NUS",
                price_addition: "352",
              },
              matchgame: {
                matchgame_id: 4,
                played_on_date: "2023-05-16",
                played_on_time: "08:14:00",
                stadium: {
                  stadium_id: 7,
                  stadium_name: "Estadio do Dragao",
                  capacity: 50000,
                  located_on_city: "Oporto",
                },
                team_one: {
                  id: 7,
                  condition: "home",
                  team: {
                    team_id: 7,
                    team_name: "F.C. Porto",
                  },
                },
                team_two: {
                  id: 8,
                  condition: "away",
                  team: {
                    team_id: 8,
                    team_name: "Borussia Dortmund",
                  },
                },
              },
            },
          },
          {
            ticket_detail_id: 27,
            ticket_quantity: 10,
            ticket_associated: {
              ticket_id: 111,
              category: "Premium",
              base_price: "920",
              zone: {
                zone_id: 73,
                stadium_location: "Estadio do Dragao North Upper Stand",
                zone_code: "NUS",
                price_addition: "352",
              },
              matchgame: {
                matchgame_id: 4,
                played_on_date: "2023-05-16",
                played_on_time: "08:14:00",
                stadium: {
                  stadium_id: 7,
                  stadium_name: "Estadio do Dragao",
                  capacity: 50000,
                  located_on_city: "Oporto",
                },
                team_one: {
                  id: 7,
                  condition: "home",
                  team: {
                    team_id: 7,
                    team_name: "F.C. Porto",
                  },
                },
                team_two: {
                  id: 8,
                  condition: "away",
                  team: {
                    team_id: 8,
                    team_name: "Borussia Dortmund",
                  },
                },
              },
            },
          },
        ],
      },
      {
        order_id: 7,
        total_price: "23115",
        checkout_date: "2023-06-18",
        tickets_details: [
          {
            ticket_detail_id: 28,
            ticket_quantity: 1,
            ticket_associated: {
              ticket_id: 120,
              category: "Premium",
              base_price: "906",
              zone: {
                zone_id: 76,
                stadium_location: "Estadio do Dragao South Stand",
                zone_code: "SS",
                price_addition: "817",
              },
              matchgame: {
                matchgame_id: 4,
                played_on_date: "2023-05-16",
                played_on_time: "08:14:00",
                stadium: {
                  stadium_id: 7,
                  stadium_name: "Estadio do Dragao",
                  capacity: 50000,
                  located_on_city: "Oporto",
                },
                team_one: {
                  id: 7,
                  condition: "home",
                  team: {
                    team_id: 7,
                    team_name: "F.C. Porto",
                  },
                },
                team_two: {
                  id: 8,
                  condition: "away",
                  team: {
                    team_id: 8,
                    team_name: "Borussia Dortmund",
                  },
                },
              },
            },
          },
          {
            ticket_detail_id: 29,
            ticket_quantity: 14,
            ticket_associated: {
              ticket_id: 121,
              category: "Economic",
              base_price: "763",
              zone: {
                zone_id: 77,
                stadium_location: "Estadio do Dragao West Upper Stand",
                zone_code: "WUS",
                price_addition: "765",
              },
              matchgame: {
                matchgame_id: 4,
                played_on_date: "2023-05-16",
                played_on_time: "08:14:00",
                stadium: {
                  stadium_id: 7,
                  stadium_name: "Estadio do Dragao",
                  capacity: 50000,
                  located_on_city: "Oporto",
                },
                team_one: {
                  id: 7,
                  condition: "home",
                  team: {
                    team_id: 7,
                    team_name: "F.C. Porto",
                  },
                },
                team_two: {
                  id: 8,
                  condition: "away",
                  team: {
                    team_id: 8,
                    team_name: "Borussia Dortmund",
                  },
                },
              },
            },
          },
        ],
      },
    ],
  };

  useEffect(() => {
    obtainUserOrders();
    //setUserOrders(data.data);
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
          {userOrders.map((order) => {
            return (
              <OrderCard
                key={order.order_id}
                id={order.order_id}
                orderInfo={order}
              ></OrderCard>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
