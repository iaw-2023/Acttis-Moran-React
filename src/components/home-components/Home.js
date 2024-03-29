import { useState, useEffect } from "react";
import "../../css/home.css";
import SearchMatchgamesResults from "./SearchMatchgamesResults";
import StadiumSearchSelect from "./StadiumSearchSelect";
import TeamSearchSelect from "./TeamSearchSelect";
import { getStadiums, getTeams } from "../../connection/requests";
import HomeAdviceText from "./HomeAdviceText";
import StadiumsCarousel from "./StadiumsCarousel";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [listStadiums, setListStadiums] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [filters, setFilters] = useState({
    teamFilter: { teamId: 0, teamName: "" },
    stadiumFilter: { stadiumId: 0, stadiumName: "" },
    dateFilter: { date: "" },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getStartupData();
  }, []);

  const getStartupData = async () => {
    getStadiums()
      .then((stadiumsResponse) => {
        setListStadiums(stadiumsResponse.data.data);
      })
      .catch((error) => {
        setListStadiums([]);
        toast.error("There was a problem loading Stadiums");
      });

    getTeams()
      .then((teamsResponse) => {
        setListTeams(teamsResponse.data.data);
      })
      .catch((error) => {
        setListTeams([]);
        toast.error("There was a problem loading Teams");
      });
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
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>
      <div className="home__top">
        <StadiumsCarousel />
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
