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

const toYears = (time, timeInterval) => {
  switch (timeInterval) {
    case "10seconds":
      return time / (6 * 60 * 24 * 365);
    case "minutes":
      return time / (60 * 24 * 365);
    case "hours":
      return time / (24 * 365);
    case "days":
      return time / 365;
    case "weeks":
      return time / 52;
    case "months":
      return time / 12;
    case "years":
      return time;

    default:
      return time / 365;
  }
};

const settingsCalc = (date, timeInterval) => {
  switch (timeInterval) {
    case "10seconds":
      return {
        amount: 632,
        timeLived: timeLivedCalc(1000 * 10, date),
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

  useEffect(() => {
    if (value === "10seconds")
      setInterval(() => setSettings(settingsCalc(startDate, value)), 10 * 1000);
    if (value === "minutes")
      setInterval(() => setSettings(settingsCalc(startDate, value)), 1000 * 60);
    if (value === "hours")
      setInterval(
        () => setSettings(settingsCalc(startDate, value)),
        1000 * 60 * 60
      );
    else setSettings(settingsCalc(startDate, value));
  }, [startDate, value]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>TTL (Time To Live) 💀</h1>
      <div className={s.model}>
        <Model3D settings={settings} />
      </div>

      <div className={s.settings}>
        <h2>Settings</h2>
        <p style={{ marginTop: "0px", fontSize: "14px" }}>
          Set a birthday date and find out how many minutes/hours/days/etc you
          have lived.
          <br />
          ...And perhaps how many you have left 😬
        </p>
        <h4>Birthday</h4>
        <DatePicker
          selected={startDate}
          locale={"sv"}
          dateFormat="yyyy-MM-dd"
          wrapperClassName="datePicker"
          onChange={(date) => setStartDate(date)}
        />
        <h4 style={{ marginBottom: "0px" }}>Time interval</h4>
        <p style={{ marginTop: "0px", fontSize: "14px" }}>
          The spheres represent units of time in {value}
        </p>
        <TimeSelsector
          values={[
            "10seconds",
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
        <p style={{ marginTop: "0px", fontSize: "14px" }}>
          You have lived {settings.timeLived.toLocaleString("sv")} {value} out
          of a total of {Math.pow(settings.amount, 3).toLocaleString("sv")}{" "}
          {value} with the assumption you will live approximately{" "}
          {Math.round(toYears(Math.pow(settings.amount, 3), value))} years
        </p>
      </div>
    </div>
  );
}

export default App;
