import { Model3D } from "./components/Model3D/Model3D";
import { TimeSelsector } from "./components/TimeSelector/TimeSelector";
import s from "./App.module.scss";
import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";
import { registerLocale } from "react-datepicker";

registerLocale("sv", sv);
setDefaultLocale("sv");

const timeLivedCalc = (timeInterval, startDate) =>
  Math.round(
    new Date(new Date().getTime() - startDate.getTime()) / timeInterval
  );

const settingsCalc = (date, timeInterval) => {
  switch (timeInterval) {
    case "5seconds":
      return {
        amount: 796,
        timeLived: timeLivedCalc(1000 * 5, date),
        wallThickness: 1,
      };
    case "minutes":
      return {
        amount: 348,
        timeLived: timeLivedCalc(1000 * 60, date),
        wallThickness: 3,
      };
    case "hours":
      return {
        amount: 89,
        timeLived: timeLivedCalc(1000 * 60 * 60, date),
        wallThickness: 5,
      };
    case "days":
      return {
        amount: 31,
        timeLived: timeLivedCalc(1000 * 60 * 60 * 24, date),
        wallThickness: 16,
      };
    case "weeks":
      return {
        amount: 16,
        timeLived: timeLivedCalc(1000 * 60 * 60 * 24 * 7, date),
        wallThickness: 8,
      };
    case "months":
      return {
        amount: 10,
        timeLived: timeLivedCalc(1000 * 60 * 60 * 24 * 30, date),
        wallThickness: 5,
      };
    case "years":
      return {
        amount: 4,
        timeLived: timeLivedCalc(1000 * 60 * 60 * 24 * 365, date),
        wallThickness: 2,
      };

    default:
      return {
        amount: 31,
        timeLived: timeLivedCalc(1000 * 60 * 60 * 24, date),
        wallThickness: 16,
      };
  }
};

function App() {
  const [startDate, setStartDate] = useState(new Date(1992, 0, 1));
  const [value, setValue] = useState("days");
  const [settings, setSettings] = useState({
    amount: 31,
    timeLived: timeLivedCalc(1000 * 60 * 60 * 24, new Date()),
    wallThickness: 16,
  });

  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  useEffect(() => {
    setSettings(settingsCalc(startDate, value));
  }, [startDate, value]);
  return (
    <div className={s.container}>
      <h1 style={{ position: "absolute" }}>TTL (Time To Live)</h1>
      <Model3D settings={settings} />
      <div>
        <h2>Settings</h2>
        <TimeSelsector
          values={[
            "5seconds",
            "minutes",
            "hours",
            "days",
            "weeks",
            "months",
            "years",
          ]}
          value={value}
          setValue={setValue}
        />
        <DatePicker
          selected={startDate}
          locale={"sv"}
          wrapperClassName="datePicker"
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </div>
  );
}

export default App;
