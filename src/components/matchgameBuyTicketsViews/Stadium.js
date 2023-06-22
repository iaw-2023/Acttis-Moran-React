import "../../css/stadium.css";
import ZoneButton from "./ZoneButton";

export default function Stadium(props) {
  return (
    <div className="matchgametickets_stadium">
      <div className="upper-container">
        <ZoneButton
          className="quarter-left"
          zone_code="NWQ"
          onClick={(zone_code) => {
            props.showZoneInfo(zone_code);
          }}
        />
        <div className="up-container">
          <ZoneButton
            className="north-upper-stand"
            zone_code="NUS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
          <ZoneButton
            className="north-stand"
            zone_code="NS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
        </div>
        <ZoneButton
          className="quarter-right"
          zone_code="NEQ"
          onClick={(zone_code) => {
            props.showZoneInfo(zone_code);
          }}
        />
      </div>

      <div className="medium-container">
        <div className="medium-left-stands">
          <ZoneButton
            className="west-upper-stand"
            zone_code="WUS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
          <ZoneButton
            className="west-stand"
            zone_code="WS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
        </div>
        <div className="field">
          <img className="field-img" src="https://uifcknmepduhxxnszwuw.supabase.co/storage/v1/object/public/Stadiums%20Image/field.jpg"></img>
        </div>
        <div className="medium-right-stands">
          <ZoneButton
            className="east-stand"
            zone_code="ES"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
          <ZoneButton
            className="east-upper-stand"
            zone_code="EUS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
        </div>
      </div>

      <div className="south-container">
        <ZoneButton
          className="quarter-low-left"
          zone_code="SWQ"
          onClick={(zone_code) => {
            props.showZoneInfo(zone_code);
          }}
        />
        <div className="south-stands">
          <ZoneButton
            className="south-stand"
            zone_code="SS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
          <ZoneButton
            className="south-upper-stand"
            zone_code="SUS"
            onClick={(zone_code) => {
              props.showZoneInfo(zone_code);
            }}
          />
        </div>
        <ZoneButton
          className="quarter-low-right"
          zone_code="SEQ"
          onClick={(zone_code) => {
            props.showZoneInfo(zone_code);
          }}
        />
      </div>
    </div>
  );
}
