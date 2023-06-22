import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function MatchgameCard(props) {
  const navigate = useNavigate();
  const { stadiumName, homeTeamName,homeTeamImageURL, awayTeamName,awayTeamImageURL, stadiumImageURL, date, time } = props;

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
          src= { stadiumImageURL }
          position="top"
          alt="..."
        />
        <div className="matchgame-card__image-container__team-logos">
          <img
            className="matchgame-card__image-container__hometeam-image"
            src={ homeTeamImageURL }
            position="top"
            alt="..."
          />
          <img
            className="matchgame-card__image-container__awayteam-image"
            src={ awayTeamImageURL }
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
