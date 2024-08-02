import { ReactElement } from "react";
import { Input } from ".";

export function Form(): ReactElement {
  return (
    <form className="form">
      <Input id="name" label="Name" />
      <Input id="username" label="Username" />
      <Input id="email" label="Email" type="email" />
      <Input id="password" label="Password" type="password" />
      <Input id="confirm-password" label="Confirm Password" type="password" />
      {/* <Button /> */}
    </form>
  );
}
