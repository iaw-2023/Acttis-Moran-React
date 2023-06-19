import { useEffect, useState } from "react";
import MatchgameCard from "./MatchgameCard";
import { getExampleMatches, getMatchesBy } from "../../connection/requests";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchMatchgamesResults(props) {
  const [listMatchgames, setListMatchgames] = useState([]);
  const [infoText, setInfoText] = useState("");
  const { filters } = props;

  useEffect(() => {
    retreiveMatchgames();
  }, [filters]);

  useEffect(() => {
    if (listMatchgames.length == 0)
      setInfoText("No Matchgames available for those filters!");
    else setInfoText("");
  }, [listMatchgames]);

  const retreiveMatchgames = async () => {
    if (filtersOff()) {
      getExampleMatches()
        .then((matchgamesResponse) => {
          setListMatchgames(matchgamesResponse.data.data);
        })
        .catch(() => setListMatchgames([]));
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

      getMatchesBy(filterParams)
        .then((matchgamesResponse) => {
          setListMatchgames(matchgamesResponse.data.data);
        })
        .catch(() => setListMatchgames([]));
    }
  };

  const filtersOff = () => {
    return (
      filters.dateFilter.date == "" &&
      filters.stadiumFilter.stadiumId == 0 &&
      filters.teamFilter.teamId == 0
    );
  };

  return (
    <>
      <span className="home__body__results__text">{infoText}</span>
      <motion.div layout className="home__body__results">
        <AnimatePresence>
          {listMatchgames.map((matchgame) => {
            return (
              <MatchgameCard
                key={matchgame.matchgame_id}
                id={matchgame.matchgame_id}
                stadiumId={matchgame.stadium.stadium_id}
                stadiumName={matchgame.stadium.stadium_name}
                date={matchgame.played_on_date}
                time={matchgame.played_on_time}
                homeTeamName={matchgame.team_one.team.team_name}
                awayTeamName={matchgame.team_two.team.team_name}
              ></MatchgameCard>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
