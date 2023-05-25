export default function MatchgameInfo(props) {
  const matchgame = props.matchgame;

  return (
    <div className="matchgametickets__stadium__container__info">
      <div
        className="matchgametickets__stadium__container__info__local-team-logo"
        id="local_team_logo"
      ></div>
      <div className="matchgametickets__stadium__container__info__match-data">
        <span className="matchgametickets__stadium__container__info__text">
          {matchgame?.stadium?.stadium_name ?? ""}
        </span>
        <span className="matchgametickets__stadium__container__info__text">
          <i className="fas fa-map-pin"></i>
          {" " + matchgame?.stadium?.located_on_city ?? ""}
        </span>
        <span className="matchgametickets__stadium__container__info__text">
          {matchgame?.team_one?.team?.team_name +
            " vs " +
            matchgame?.team_two?.team?.team_name ?? ""}
        </span>
        <span className="matchgametickets__stadium__container__info__text">
          {matchgame?.played_on_date ?? ""}
        </span>
        <span className="matchgametickets__stadium__container__info__text">
          {matchgame?.played_on_time ?? ""}
        </span>
      </div>
      <div
        className="matchgametickets__stadium__container__info__away-team-logo"
        id="away_team_logo"
      ></div>
    </div>
  );
}
