import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

export default function ZoneAdviceText(props) {
  const [adviceText, setAdviceText] = useState(
    "Choose the stadium zone where you want to buy your tickets!"
  );

  const { actualZone } = props;

  useEffect(() => {
    if (actualZone !== null)
      setAdviceText(
        "Now choose your specific ticket of " +
          actualZone.stadium_location +
          "!"
      );
  }, [actualZone]);

  return (
    <TextTransition
      className="matchgametickets__ticket__selection__container__advicetext"
      springConfig={presets.wobbly}
    >
      {adviceText}
    </TextTransition>
  );
}
