import React from "react";
import { Alert } from "reactstrap";

const Loader = () => {
  return (
    <>
      <Alert className="text-center" color="light">
        <p>Loading...</p>
      </Alert>
    </>
  );
};

export default Loader;
