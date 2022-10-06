export const TimeSelsector = ({ values, value, setValue }) => {
  const next = () =>
    setValue(values[Math.min(values.length - 1, values.indexOf(value) + 1)]);

  const previous = () =>
    setValue(values[Math.max(0, values.indexOf(value) - 1)]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "200px",
      }}
    >
      <button style={{ position: "relative", zIndex: 1 }} onClick={previous}>
        {"<"}
      </button>
      <p>{value}</p>
      <button style={{ position: "relative", zIndex: 1 }} onClick={next}>
        {">"}
      </button>
    </div>
  );
};
