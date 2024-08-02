import { FocusEventHandler, MouseEventHandler, ReactElement, useRef, useState } from "react";

type TInputType = "email" | "password" | "text";

interface IInputProps {
  id?: string;
  label: string;
  type?: TInputType;
}

export function Input(props: IInputProps): ReactElement {
  // ############### Hooks & State ###############

  // For the component to handle state we need to use "useState" from react. It's a hook that react uses to make state persist across rerenders, and it's also used to trigger a rerender of the component every time the state updates. Observe though, if the state is a reference variable, you  always need to create a new reference in order for react to actually trigger a rerender.

  const [value, setValue] = useState<string>("");
  const [labelClasses, setLabelClasses] = useState<string[]>(["label"]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ############### Event Handlers ###############

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    if (value === "") {
      const updatedClasses = labelClasses.filter(
        (labelClass) => labelClass !== "minimize" && labelClass !== "blue"
      );
      setLabelClasses(updatedClasses);
    } else {
      const updatedClasses = labelClasses.filter((labelClass) => labelClass !== "blue");
      setLabelClasses(updatedClasses);
    }
  };

  const handleOnClick: MouseEventHandler<HTMLLabelElement> = () => {
    inputRef.current?.focus();

    // The spread syntax is used to "spread out" all the elements in the existing array in to the new array.
    const updatedClasses: string[] = [...labelClasses, "minimize", "blue"];
    setLabelClasses(updatedClasses);
  };

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = () => {
    labelClasses.includes("minimize")
      ? setLabelClasses([...labelClasses, "blue"])
      : setLabelClasses([...labelClasses, "minimize", "blue"]);
  };

  // ############### Derived variables / Regular JS ###############
  const id = props.id ? props.id : props.label.toLowerCase();
  const type = props.type ? props.type : "text";

  const derivedLabelClasses = labelClasses.join(" ");
  const derivedInputClasses = ["input-field"].join(" ");

  return (
    <div className="input">
      <label className={derivedLabelClasses} onClick={handleOnClick}>
        {props.label}
      </label>
      <input
        className={derivedInputClasses}
        id={id}
        onBlur={handleOnBlur}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleOnFocus}
        ref={inputRef}
        type={type}
        value={value}
      />
    </div>
  );
}
