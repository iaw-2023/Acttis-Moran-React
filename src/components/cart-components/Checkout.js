import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Checkout = () => {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 49.99,
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AerQpO5MSomo1nfRkRJqZtj4G5DgKB956foadxlXjEha0wg6s71TkF0ZD4xaCdR8JGsMGD8qlaE-OM3S",
        }}
      >
        <div className="paypal-button-container">
          <PaypalCheckoutButton product={product} />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default Checkout;
