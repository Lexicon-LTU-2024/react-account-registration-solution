import { ReactElement, ReactNode } from "react";

type TButtonType = "button" | "submit";

interface IButtonProps {
  // ReactNode is a type that represents all of the things React can render.
  children: ReactNode;
  disabled?: true;
  type: TButtonType;
}

export function Button(props: IButtonProps): ReactElement {
  return (
    <button className="button" disabled={props.disabled} type={props.type}>
      {props.children}
    </button>
  );
}
