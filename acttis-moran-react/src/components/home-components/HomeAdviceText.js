import TextTransition, { presets } from "react-text-transition";
import { useState } from "react";

export default function HomeAdviceText(props) {
  const [adviceText, setAdviceText] = useState(
    "These are example matches, select the filters that you want to find your desired matchgame!"
  );

  return (
    <TextTransition
      className="home__body__search__advicetext"
      springConfig={presets.wobbly}
    >
      {adviceText}
    </TextTransition>
  );
}
