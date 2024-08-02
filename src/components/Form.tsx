import { FormEventHandler, ReactElement, useEffect, useState } from "react";
import { Button, Input } from ".";
import { isConfirmPasswordValid, isPasswordValid } from "../utils";

interface IRegistrationData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Form(): ReactElement {
  // ############### Hooks & State ###############
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<true | undefined>(true);

  // It also works if you want to create five useState variabels, on for each input. But I chose this approach  with an object instead.
  const [registrationData, setRegistrationData] = useState<IRegistrationData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ############### Event Handlers ###############

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(registrationData);
  };

  // ############### Functions ###############

  const checkEnableSubmit = (): void => {
    // .every() return true if every element passes the predicate, otherwise false.
    const allInputsHaveValue = Object.values(registrationData).every((value) => value !== "");

    const passwordsAreValid =
      isConfirmPasswordValid(registrationData.confirmPassword, registrationData.password) &&
      isPasswordValid(registrationData.password);

    passwordsAreValid && allInputsHaveValue ? setDisableSubmit(undefined) : setDisableSubmit(true);
  };

  const updateRegistrationData = (id: string, value: string): void => {
    // The [id] is using array brackets in order to dynamically set the key corresponding to the id value.
    setRegistrationData({ ...registrationData, [id]: value });
  };

  const validatePasswordAndUpdate = (id: string, value: string): void => {
    if (id !== "password") return;

    isPasswordValid(value) ? setPasswordError(false) : setPasswordError(true);
    updateRegistrationData("password", value);
  };

  const validateConfirmPasswordAndUpdate = (id: string, value: string): void => {
    if (id !== "confirmPassword") return;

    isConfirmPasswordValid(value, registrationData.password)
      ? setConfirmPasswordError(false)
      : setConfirmPasswordError(true);

    updateRegistrationData("confirmPassword", value);
  };

  // useEffect allows us to run some code in as a reaction to some specifed changes in our component. Two arguments, first arguments is the callback that is run as the "effect", and the second one is an array containg dependecies that the useEffect reacts on.
  useEffect(() => {
    checkEnableSubmit();
  }, [registrationData]);

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <Input
        id="name"
        label="Name"
        updateValue={updateRegistrationData}
        value={registrationData.name}
      />
      <Input
        id="username"
        label="Username"
        updateValue={updateRegistrationData}
        value={registrationData.username}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        updateValue={updateRegistrationData}
        value={registrationData.email}
      />
      <Input
        id="password"
        label="Password"
        error={passwordError}
        type="password"
        updateValue={validatePasswordAndUpdate}
        value={registrationData.password}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        error={confirmPasswordError}
        type="password"
        updateValue={validateConfirmPasswordAndUpdate}
        value={registrationData.confirmPassword}
      />
      <Button disabled={disableSubmit} type="submit">
        Sign Up
      </Button>
    </form>
  );
}
