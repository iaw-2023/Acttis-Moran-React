import { useEffect, useState } from "react";
import MatchgameCard from "./MatchgameCard";
import { getExampleMatches, getMatchesBy } from "../../connection/requests";

export default function SearchMatchgamesResults(props) {
  const [listMatchgames, setListMatchgames] = useState([]);
  const [listMatchgameCards, setListMatchgameCards] = useState([]);

  const { filters } = props;

  useEffect(() => {
    retreiveMatchgames();
  }, [filters]);

  const retreiveMatchgames = async () => {
    let response = false;

    if (filtersOff()) {
      response = await getExampleMatches();
    } else {
      let filterParams = "?";
      let teamFilter =
        filters.teamFilter.teamId != 0
          ? "teamId=" + filters.teamFilter.teamId + "&"
          : "";
      let stadiumFilter =
        filters.stadiumFilter.stadiumId != 0
          ? "stadiumId=" + filters.stadiumFilter.stadiumId + "&"
          : "";
      let dateFilter =
        filters.dateFilter.date != "" ? "date=" + filters.dateFilter.date : "";

      filterParams += teamFilter + stadiumFilter + dateFilter;

      response = await getMatchesBy(filterParams);
    }
    setListMatchgames(response);
  };

  const filtersOff = () => {
    return (
      filters.dateFilter.date == "" &&
      filters.stadiumFilter.stadiumId == 0 &&
      filters.teamFilter.teamId == 0
    );
  };

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
    });
    setListMatchgameCards(array_matchgames);
  };

  return <div className="home__body__results">{listMatchgameCards}</div>;
}
