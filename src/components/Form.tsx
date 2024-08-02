import { FormEventHandler, ReactElement, useState } from "react";
import { Button, Input } from ".";

interface IRegistrationData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Form(): ReactElement {
  // ############### Hooks & State ###############
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
  const updateRegistrationData = (id: string, value: string) => {
    // The [id] is using array brackets in order to dynamically set the key corresponding to the id value.
    setRegistrationData({ ...registrationData, [id]: value });
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
        type="password"
        updateValue={updateRegistrationData}
        value={registrationData.password}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        updateValue={updateRegistrationData}
        value={registrationData.confirmPassword}
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
