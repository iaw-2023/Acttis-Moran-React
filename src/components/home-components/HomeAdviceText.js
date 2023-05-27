import TextTransition, { presets } from "react-text-transition";
import { useEffect, useState } from "react";

export default function HomeAdviceText(props) {
  const [adviceText, setAdviceText] = useState(
    "These are example matches, select the filters that you want to find your desired matchgame!"
  );

  const { filters } = props;

  useEffect(() => {
    updateAdviceText();
  }, [filters]);

  const updateAdviceText = () => {
    let updatedAdviceText =
      "These are example matches, select the filters that you want to find your desired matchgame!";

    if (!filtersOff()) {
      updatedAdviceText = "Showing matchgames :";
      if (filters.stadiumFilter.stadiumId != 0) {
        updatedAdviceText += " played in " + filters.stadiumFilter.stadiumName;
      }
      if (filters.teamFilter.teamId != 0) {
        updatedAdviceText +=
          " where does the " + filters.teamFilter.teamName + " plays";
      }
      if (filters.dateFilter.date != "") {
        updatedAdviceText += " disputed on date " + filters.dateFilter.date;
      }
    }

    setAdviceText(updatedAdviceText);
  };

  const filtersOff = () => {
    return (
      filters.dateFilter.date == "" &&
      filters.stadiumFilter.stadiumId == 0 &&
      filters.teamFilter.teamId == 0
    );
  };

  return (
    <TextTransition
      className="home__body__search__advicetext"
      springConfig={presets.wobbly}
    >
      {adviceText}
    </TextTransition>
  );
}
