import { Route, Routes } from "react-router-dom";
import Home from "./home-components/Home";
import Layout from "./pagewrappers/Layout";
import Contact from "./Contact";
import Missing from "./Missing";
import MatchgameBuyTickets from "./matchgameBuyTicketsViews/MatchgameBuyTickets";
import Cart from "./cart-components/Cart";
import RequireAuth from "./login-components/RequireAuth";
import UserOrders from "./user-components/UserOrders";
import LogIn from "./login-components/Login";
import Register from "./login-components/Register";
import Checkout from "./cart-components/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/matchgamebuytickets" element={<MatchgameBuyTickets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/paypal" element={<Checkout />} />

        {/* Want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/userorders" element={<UserOrders />} />
        </Route>

        {/* Catch all (pages that doesnt exists) */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
