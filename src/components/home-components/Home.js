import { useState, useEffect } from "react";
import "../../css/home.css";
import SearchMatchgamesResults from "./SearchMatchgamesResults";
import StadiumSearchSelect from "./StadiumSearchSelect";
import TeamSearchSelect from "./TeamSearchSelect";
import { getStadiums, getTeams } from "../../connection/requests";
import HomeAdviceText from "./HomeAdviceText";
import Carrousel from "./Carrousel";

export default function Home() {
  const [listStadiums, setListStadiums] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [filters, setFilters] = useState({
    teamFilter: { teamId: 0, teamName: "" },
    stadiumFilter: { stadiumId: 0, stadiumName: "" },
    dateFilter: { date: "" },
  });

  useEffect(() => {
    getStartupData();
  }, []);

  const getStartupData = async () => {
    const stadiumsResponse = await getStadiums();
    if (stadiumsResponse.status == 200) {
      setListStadiums(stadiumsResponse.data.data);
    } else {
      setListStadiums([]);
    }

    const teamsResponse = await getTeams();
    if (teamsResponse.status == 200) {
      setListTeams(teamsResponse.data.data);
    } else {
      setListTeams([]);
    }
  };

  const handleChangeOnDate = (e) => {
    setFilters({
      teamFilter: {
        teamId: filters.teamFilter.teamId,
        teamName: filters.teamFilter.teamName,
      },
      stadiumFilter: {
        stadiumId: filters.stadiumFilter.stadiumId,
        stadiumName: filters.stadiumFilter.stadiumName,
      },
      dateFilter: { date: e.target.value },
    });
  };

  return (
    <div className="home__section">
      <div className="home__top">
        <Carrousel />
      </div>
      <div className="home__body">
        <div className="home__body__search">
          <div className="home__body__search__body">
            <input
              className="home__body__search__body__date"
              id="home__body__search__body__date"
              type="date"
              value={filters.dateFilter.date}
              onChange={(e) => {
                handleChangeOnDate(e);
              }}
            ></input>
            <StadiumSearchSelect
              stadiums={listStadiums}
              onSelectStadium={(stadiumId, stadiumName) => {
                setFilters({
                  teamFilter: {
                    teamId: filters.teamFilter.teamId,
                    teamName: filters.teamFilter.teamName,
                  },
                  stadiumFilter: {
                    stadiumId: stadiumId,
                    stadiumName: stadiumName,
                  },
                  dateFilter: { date: filters.dateFilter.date },
                });
              }}
            ></StadiumSearchSelect>
            <TeamSearchSelect
              teams={listTeams}
              onSelectTeam={(teamId, teamName) => {
                setFilters({
                  teamFilter: { teamId: teamId, teamName: teamName },
                  stadiumFilter: {
                    stadiumId: filters.stadiumFilter.stadiumId,
                    stadiumName: filters.stadiumFilter.stadiumName,
                  },
                  dateFilter: { date: filters.dateFilter.date },
                });
              }}
            ></TeamSearchSelect>
          </div>
        </div>
        <HomeAdviceText filters={filters} />
        <hr />
        <SearchMatchgamesResults filters={filters} />
      </div>
      <div className="home__contacts"></div>
    </div>
  );
}
