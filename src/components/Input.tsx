import { FocusEventHandler, MouseEventHandler, ReactElement, useRef, useState } from "react";

export function Input(): ReactElement {
  // ############### Hooks & State ###############

  // For the component to handle state we need to use "useState" from react. It's a hook that react uses to make state persist across rerenders, and it's also used to trigger a rerender of the component every time the state updates. Observe though, if the state is a reference variable, you  always need to create a new reference in order for react to actually trigger a rerender.

  const [value, setValue] = useState<string>("blablabla");
  const [labelClasses, setLabelClasses] = useState<string[]>(["label"]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ############### Event Handlers ###############

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    const updatedClasses = labelClasses.filter(
      (labelClass) => labelClass !== "minimize" && labelClass !== "blue"
    );

    setLabelClasses(updatedClasses);
  };

  const handleOnClick: MouseEventHandler<HTMLLabelElement> = () => {
    inputRef.current?.focus();

    // The spread syntax is used to "spread out" all the elements in the existing array in to the new array.
    const updatedClasses: string[] = [...labelClasses, "minimize", "blue"];
    setLabelClasses(updatedClasses);
  };

  // ############### Derived variables / Regular JS ###############

  const derivedLabelClasses = labelClasses.join(" ");
  const derivedInputClasses = ["input-field"].join(" ");

  return (
    <div className="input">
      <label className={derivedLabelClasses} onClick={handleOnClick}>
        label
      </label>
      <input
        className={derivedInputClasses}
        onBlur={handleOnBlur}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        type="text"
        value={value}
      />
    </div>
  );
}
