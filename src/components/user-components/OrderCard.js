import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { motion } from "framer-motion";

const stadiumPhotosPath = "/images/stadium_photos/";
const teamLogosPath = "/images/team_logos/";

export default function OrderCard() {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="matchgame-card"
    >
      <div className="matchgame-card__image-container">
        <img
          className="matchgame-card__image-container__stadium-image"
          src={stadiumPhotosPath + stadiumName + ".jpg"}
          position="top"
          alt="..."
        />
        <div className="matchgame-card__image-container__team-logos">
          <img
            className="matchgame-card__image-container__hometeam-image"
            src={teamLogosPath + homeTeamName + ".png"}
            position="top"
            alt="..."
          />
          <img
            className="matchgame-card__image-container__awayteam-image"
            src={teamLogosPath + awayTeamName + ".png"}
            position="top"
            alt="..."
          />
        </div>
      </div>
      <MDBCardBody className="matchgame-card__body">
        <div className="matchgame-card__title__container">
          <MDBCardTitle className="matchgame-card__title">
            {homeTeamName}
          </MDBCardTitle>
          <MDBCardTitle className="matchgame-card__title">vs</MDBCardTitle>
          <MDBCardTitle className="matchgame-card__title">
            {awayTeamName}
          </MDBCardTitle>
        </div>
        <span className="matchgame-card__text">
          Matchgame played between {homeTeamName} and {awayTeamName} in{" "}
          {stadiumName} stadium.
        </span>
        <span className="matchgame-card__text-datetime">
          {date} | {time}
        </span>
        <div className="matchgame-card__button_container">
          <button
            className="matchgame-card__button"
            onClick={() => {
              navigate("/matchgamebuytickets", {
                state: { matchgame_id: props.id, stadium_id: props.stadiumId },
              });
            }}
          >
            Choose Tickets!
          </button>
        </div>
      </MDBCardBody>
    </motion.div>
  );
}
