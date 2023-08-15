import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
        /*
        let order = {
          packageID: 1,
        };

        axios
          .post(
            "http://localhost:8000/restapi/payment/createOrder",
            JSON.stringify(order)
          )
          .then((response) => response.json())
          .then((order) => order.id)
          .catch((error) => toast.error("Error creating Order"));
          */
      }}
      onApprove={async (data, actions) => {
        let orderData = {
          orderID: data.orderID,
        };

        console.log(data);

        //Tengo que llamar al endpoint con el ID de la order y se confirma alla
        //Se actualiza el usuario a premium y listo

        axios
          .post(
            "http://localhost:8000/restapi/payment/confirmOrder",
            JSON.stringify(orderData)
          )
          .then((response) => toast.success(response.success))
          .catch((error) => toast.error("ASD"));

        //console.log(data.orderID);

        //handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
    />
  );
};

export default PaypalCheckoutButton;
