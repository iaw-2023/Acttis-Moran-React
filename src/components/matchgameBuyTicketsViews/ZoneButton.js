export default function ZoneButton(props) {
  return (
    <button
      className={props.className}
      onClick={() => {
        props.onClick(props.zone_code);
      }}
    ></button>
  );
}
