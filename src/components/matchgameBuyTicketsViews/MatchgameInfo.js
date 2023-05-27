const teamLogosPath = "/images/team_logos/";

export default function MatchgameInfo(props) {
  const { matchgame } = props;

  return (
    <div className="matchgametickets__stadium__container__info">
      {matchgame === null ? (
        <div className="matchgametickets__stadium__container__info__text">
          Invalid Matchgame
        </div>
      ) : (
        <>
          <div className="matchgametickets__stadium__container__info__logo-container">
            <img
              className="matchgametickets__stadium__container__info__local-team-logo"
              src={
                teamLogosPath + matchgame?.team_one?.team?.team_name + ".png"
              }
            />
          </div>
          <div className="matchgametickets__stadium__container__info__match-data">
            <span className="matchgametickets__stadium__container__info__text">
              {matchgame?.stadium?.stadium_name ?? ""}
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              <i className="fas fa-map-pin"></i>
              {" " + matchgame?.stadium?.located_on_city ?? ""}
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              {matchgame?.team_one?.team?.team_name}
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              vs
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              {matchgame?.team_two?.team?.team_name ?? ""}
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              {matchgame?.played_on_date ?? ""}
            </span>
            <span className="matchgametickets__stadium__container__info__text">
              {matchgame?.played_on_time ?? ""}
            </span>
          </div>
          <div className="matchgametickets__stadium__container__info__logo-container">
            <img
              className="matchgametickets__stadium__container__info__away-team-logo"
              src={
                teamLogosPath + matchgame?.team_two?.team?.team_name + ".png"
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
