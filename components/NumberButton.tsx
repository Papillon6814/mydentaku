import { memo } from "react";

const NumberButton = memo(
  ({
    num,
    onPressNumber,
  }: {
    num: number;
    onPressNumber: (num: number) => void;
  }) => {
    console.log("render!");
    return (
      <button
        className="btn btn-circle btn-outline"
        onClick={() => onPressNumber(num)}
      >
        {num}
      </button>
    );
  }
);

export default NumberButton;
