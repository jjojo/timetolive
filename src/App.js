import { Model3D } from "./components/Model3D/Model3D";
import { TimeSelsector } from "./components/TimeSelector/TimeSelector";
import s from "./App.module.scss";
import { useState } from "react";

const dateOfBirth = new Date(1992, 6, 9);

let msLived = new Date(new Date().getTime() - dateOfBirth.getTime());

const yearsLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) /
    (1000 * 60 * 60 * 24) /
    365
);

const weeksLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) /
    (1000 * 60 * 60 * 24) /
    7
);

const hoursLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60)
);

const minutesLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60)
);

const secondsLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) / (1000 * 12)
);

const TIME_TO_LIVE = {
  seconds: Math.round(msLived / (1000 * 12)),
  minutes: Math.round(msLived / (1000 * 60)),
  hours: Math.round(msLived / (1000 * 12)),
  days: Math.round(msLived / (1000 * 60 * 60 * 24)),
  weeks: Math.round(msLived / (1000 * 60 * 60 * 24 * 7)),
  months: Math.round(msLived / (1000 * 12)),
  years: Math.round(msLived / (1000 * 60 * 60 * 24 * 365)),
};

const AMOUNT = {
  seconds: 438,
  minutes: 1,
  hours: 1,
  days: 31,
  weeks: 16,
  months: 1,
  years: 4,
};

function App() {
  const [value, setValue] = useState("days");
  const [amount, setAmount] = useState(31);
  const [count, setCount] = useState(Math.pow(amount, 3));
  return (
    <div className={s.container}>
      <h1 style={{ position: "absolute" }}>TTL (Time To Live)</h1>
      <Model3D amount={AMOUNT[value]} count={count} />
      <h2>Settings</h2>
      <TimeSelsector
        values={[
          "seconds",
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
    </div>
  );
}

export default App;
