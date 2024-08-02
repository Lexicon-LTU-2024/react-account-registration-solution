import { FormEventHandler, ReactElement, useState } from "react";
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
    console.log("Submitted");
  };

  // ############### Functions ###############
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
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
