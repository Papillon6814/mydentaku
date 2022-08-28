import { memo } from "react";

const NumberDisplay = memo(({ display }: { display: string }) => {
  return (
    <input
      value={display}
      type="text"
      placeholder="You can't touch this"
      className="input input-bordered col-span-4 w-full max-w-xs"
      disabled
    />
  );
});
export default NumberDisplay;
