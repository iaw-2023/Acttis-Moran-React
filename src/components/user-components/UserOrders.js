import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import OrdersResults from "./OrdersResults";
import "../../css/userorders.css";
import { initMercadoPago } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';
import {authorizePayment, confirmOrder, getUserOrders} from "../../connection/requests";

initMercadoPago('TEST-d38676da-057a-45e3-8ad3-9779f2f281b6');

export default function UserOrders() {
    const [userOrders, setUserOrders] = useState([]);
    const [orderToPay, setOrderToPay] = useState(null);
    const [mercadoPagoOrderPayment, setMercadoPagoOrderPayment] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        if(orderToPay !== null){
            setMercadoPagoOrderPayment(
                <CardPayment
                initialization={{ amount: orderToPay.total_price }}
                onSubmit={async (formData) => {

                    const orderData = {orderId: orderToPay.order_id}
                    authorizePayment(auth.accessToken,formData).then(()=>{
                        confirmOrder(auth.accessToken,orderData).then(()=>{
                                toast.success("Payment complete!");
                                setOrderToPay(null);
                                obtainUserOrders();
                            }
                        ).catch(()=>{
                            toast.error("Error confirming order!");
                            }
                        )
                    }).catch(()=>{
                        toast.error("Error with payment!");
                    })


                }}
                customization={customization}
                className="card__payment_mercadopago"
            />);
            window.scrollTo(0, 0);
        }
        else{
            setMercadoPagoOrderPayment([]);
        }
    }, [orderToPay]);

    const customization = {
        visual: {
            style: {
                theme: 'dark'
            },

        },
        paymentMethods: {
            ticket: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        }
    };

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="mercadopago__container__body">
        {orderToPay !== null ? (
          <button
            className="mercadopago__container__body__close-button"
            onClick={() => {
              setOrderToPay(null);
            }}
          >
            X
          </button>
        ) : null}
        {mercadoPagoOrderPayment}
      </div>

      <div className="userorders__container__body">
        <OrdersResults
          userOrders={userOrders}
          onSelectOrder={(order) => {
            setOrderToPay(order);
          }}
        />
      </div>
    </div>
  );
}
