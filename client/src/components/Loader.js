import React from "react";
import { Alert } from "reactstrap";

const Loader = () => {
  return (
    <div>
      <Alert className="text-center" color="light">
        <p>Loading...</p>
      </Alert>
    </div>
  );
};

export default Loader;
