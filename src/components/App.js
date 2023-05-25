import { Route, Routes } from "react-router-dom";
import Home from "./home-components/Home";
import Layout from "./pagewrappers/Layout";
import Contact from "./Contact";
import Missing from "./Missing";
import MatchgameBuyTickets from "./matchgameBuyTicketsViews/MatchgameBuyTickets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/matchgamebuytickets" element={<MatchgameBuyTickets />} />
        <Route path="/contact" element={<Contact />} />

        {/* Catch all (pages that doesnt exists) */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
