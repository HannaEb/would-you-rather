import React from "react";
import { Alert } from "reactstrap";

const Error = (props) => {
  const code = props.code || 400;
  const message = props.message || "Oops, something went wrong";
  return (
    <div>
      <Alert className="text-center" color="light">
        <h1 className="alert-heading">{code}</h1>
        <p>{message}</p>
      </Alert>
    </div>
  );
};

export default Error;
