import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stadiumPhotosPath = "/images/stadium_photos/";
const teamLogosPath = "/images/team_logos/";

export default function MatchgameCard(props) {
  const navigate = useNavigate();
  const { stadiumName, homeTeamName, awayTeamName, date, time } = props;

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
            {homeTeamName + " vs " + awayTeamName}
          </MDBCardTitle>
        </div>
        <span className="matchgame-card__text">
          Partido disputado entre {homeTeamName} y {awayTeamName} en el estadio{" "}
          {stadiumName}.
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
            Buy Tickets
          </button>
        </div>
      </MDBCardBody>
    </motion.div>
  );
}
