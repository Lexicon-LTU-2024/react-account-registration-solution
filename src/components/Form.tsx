import { ReactElement } from "react";
import { Input } from ".";

export function Form(): ReactElement {
  return (
    <form className="form">
      <Input />
      <Input />
      <Input type="email" />
      <Input type="password" />
      <Input type="password" />
      {/* <Button /> */}
    </form>
  );
}
