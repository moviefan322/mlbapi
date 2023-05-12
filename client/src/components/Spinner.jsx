import { SpinnerCircular } from "spinners-react";

function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <SpinnerCircular />
      </div>
    </div>
  );
}

export default Spinner;
