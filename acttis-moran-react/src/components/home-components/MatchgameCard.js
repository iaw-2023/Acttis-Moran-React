import { useState } from "react";
import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

const stadiumPhotosPath = "/images/stadium_photos/";
const teamLogosPath = "/images/team_logos/";

export default function MatchgameCard(props) {
  const [stadiumName, setStadiumName] = useState(props.stadium_name);
  const [homeTeamName, setLocalTeamName] = useState(props.home_team);
  const [awayTeamName, setAwayTeamName] = useState(props.away_team);

  return (
    <div className="matchgame-card">
      <img
        className="matchgame-card__image"
        src={stadiumPhotosPath + stadiumName + ".jpg"}
        position="top"
        alt="..."
      />
      <MDBCardBody className="matchgame-card__body">
        <div className="matchgame-card__title__container">
          <MDBCardTitle className="matchgame-card__title">
            {homeTeamName + " vs " + awayTeamName}
          </MDBCardTitle>
        </div>
        <span className="matchgame-card__text">
          Partido disputado entre {homeTeamName} y {awayTeamName} en el estadio{" "}
          {stadiumName}
        </span>
        <div className="matchgame-card__button_container">
          <button className="matchgame-card__button">Buy Tickets</button>
        </div>
      </MDBCardBody>
    </div>
  );
}
