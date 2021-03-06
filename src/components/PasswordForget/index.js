import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email1: "",
  error: null,
};
const PasswordForgetFormBase = (props) => {
  const [formData, setForm] = React.useState(INITIAL_STATE);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    const { email } = formData;

    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setForm({ ...INITIAL_STATE });

        console.log("Reset call success");
      })
      .catch((error) => {
        setForm((prevState) => ({
          ...prevState,
          error,
        }));
      });

    event.preventDefault();
  };

  const isInvalid = formData.email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email1"
        value={formData.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />

      <button disabled={isInvalid} type="submit">
        Reset Password
      </button>

      {formData.error && <p>{formData.error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
