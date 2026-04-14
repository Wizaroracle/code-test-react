import "./spinner.scss";

function Spinner() {
  return (
    <div className="spinner">
      <div />
      <div />
      <div />
    </div>
  );
}

Spinner.defaultProps = {
  color: null,
};

export default Spinner;
