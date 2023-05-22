import { useEffect, useState } from "react";
import MatchgameCard from "./MatchgameCard";

export default function SearchMatchgamesResults(props) {
  const [listResults, setListResults] = useState([]);
  const { listMatchgames } = props;

  useEffect(() => {
    fillResults();
  }, [listMatchgames]);

  const fillResults = () => {
    let array_matchgames = [];
    listMatchgames.map((matchgame) => {
      array_matchgames.push(
        <MatchgameCard
          key={matchgame.matchgame_id}
          id={matchgame.matchgame_id}
          stadium_id={matchgame.stadium.stadium_id}
          stadium_name={matchgame.stadium.stadium_name}
          home_team={matchgame.team_one.team.team_name}
          away_team={matchgame.team_two.team.team_name}
        ></MatchgameCard>
      );
      return 0;
    });
    setListResults(array_matchgames);
  };

  return <div className="home__body__results">{listResults}</div>;
}
