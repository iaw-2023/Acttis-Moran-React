import { useEffect, useState } from "react";
import Select from "react-select";
import "../../css/home.css";

export default function StadiumSearchSelect(props) {
  const [listOptions, setListOptions] = useState([]);
  const [value, setValue] = useState(0);
  const [stadiumName, setStadiumName] = useState("");

  const rootStyle = document.querySelector(":root");
  const cssVariables = getComputedStyle(rootStyle);

  useEffect(() => {
    fillOptions();
  }, []);

  useEffect(() => {
    props.onSelectStadium(value, stadiumName);
  }, [value]);

  const fillOptions = () => {
    let array_options = [];
    props.stadiums.map((stadium) => {
      array_options.push({
        value: stadium.stadium_id,
        label: stadium.stadium_name,
      });
    });
    setListOptions(array_options);
  };

  return (
    <Select
      className="home__body__search__body__select-stadium"
      classNamePrefix={"home__body__search__body__select-stadium"}
      id="home__body__search__body__select-stadium"
      placeholder="Filter by Stadium"
      defaultValue={value}
      onChange={(e) => {
        if (e != null) {
          setValue(e?.value);
          setStadiumName(e?.label);
        } else setValue(0);
      }}
      options={listOptions}
      isSearchable
      isClearable
      noOptionsMessage={() => "No Stadium found..."}
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
