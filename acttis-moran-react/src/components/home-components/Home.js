import { useState, useEffect } from "react";
import "../../css/home.css";
import SearchMatchgamesResults from "./SearchMatchgamesResults";
import {
  getStadiums,
  getExampleMatches,
  getTeams,
  getMatchesBy,
} from "../../connection/requests";
import HomeAdviceText from "./HomeAdviceText";

export default function Home() {
  const [listMatchgames, setListMatchgames] = useState([]);
  const [listStadiums, setListStadiums] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [adviceText, setAdviceText] = useState(
    "These are example matches, select the filters that you want to find your desired matchgame!"
  );

  const getStartupData = async () => {
    const stadiumsResponse = await getStadiums();
    setListStadiums(stadiumsResponse);

    const teamsResponse = await getTeams();
    setListTeams(teamsResponse);

    const exampleMatches = await getExampleMatches();
    setListMatchgames(exampleMatches);
  };

  useEffect(() => {
    getStartupData();
  }, []);

  return (
    <div className="home__section">
      <div className="home__top"></div>
      <div className="home__body">
        <div className="home__body__search">
          <div className="home__body__search__body"></div>
        </div>
        <HomeAdviceText></HomeAdviceText>
        <hr />
        <SearchMatchgamesResults listMatchgames={listMatchgames} />
      </div>
      <div className="home__contacts"></div>
    </div>
  );
}
