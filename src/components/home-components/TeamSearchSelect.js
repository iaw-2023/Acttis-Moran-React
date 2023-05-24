import { useState, useEffect } from "react";
import Select from "react-select";

export default function TeamSearchSelect(props) {
  const { teams } = props;

  const [listOptions, setListOptions] = useState([]);
  const [value, setValue] = useState(0);
  const [teamName, setTeamName] = useState("");

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  useEffect(() => {
    fillOptions();
  }, [teams]);

  useEffect(() => {
    props.onSelectTeam(value, teamName);
  }, [value]);

  const fillOptions = () => {
    let array_options = [];
    teams.map((team) => {
      array_options.push({
        value: team.team_id,
        label: team.team_name,
      });
    });
    setListOptions(array_options);
  };
  return (
    <Select
      className="home__body__search__body__select-team"
      classNamePrefix={"home__body__search__body__select-team"}
      id="home__body__search__body__select-team"
      placeholder="Filter by Team"
      onChange={(e) => {
        if (e != null) {
          setValue(e?.value);
          setTeamName(e?.label);
        } else setValue(0);
      }}
      options={listOptions}
      isSearchable
      isClearable
      noOptionsMessage={() => "No Team found..."}
      styles={{
        menuList: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: cssVariables.getPropertyValue("--nav-color"),
          color: cssVariables.getPropertyValue("--nav-enterprise-color"),
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: "30px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? cssVariables.getPropertyValue("--hover-color")
            : cssVariables.getPropertyValue("--nav-color"),
          color: state.isFocused
            ? cssVariables.getPropertyValue("--nav-color")
            : cssVariables.getPropertyValue("--nav-enterprise-color"),
          transition: "background 0.5s ease, color 0.5s ease",
        }),
        noOptionsMessage: (baseStyles, state) => ({
          ...baseStyles,
          color: cssVariables.getPropertyValue("--nav-enterprise-color"),
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: cssVariables.getPropertyValue("--nav-enterprise-color"),
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: cssVariables.getPropertyValue("--nav-enterprise-color"),
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: cssVariables.getPropertyValue("--nav-enterprise-color"),
          margin: "auto",
        }),
      }}
    ></Select>
  );
}
