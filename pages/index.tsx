import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useCallback } from "react";
import NumberButton from "@components/NumberButton";
import NumberDisplay from "@components/NumberDisplay";

const Home: NextPage = () => {
  const [display, setDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState<string | null>(null);
  const [isLastInputOperator, setIsLastInputOperator] = useState<
    boolean | null
  >(null);
  const [numberMainBox, setNumberMainBox] = useState<number | null>(null);

  const pressNumber = useCallback(
    (number: number) => {
      setIsLastInputOperator(false);
      if (isLastInputOperator) {
        setNumberMainBox(Number(`${display}`));
        setDisplay(`${number}`);
      } else {
        setDisplay((current) => `${current}${number}`);
      }
    },
    []
  );

  const calculate = (operator: string, num1: number, num2: number): number => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num1;
    }
  };

  const pressOperator = (operator: string) => {
    if (numberMainBox) {
      const calcResult = calculate(
        lastOperator!,
        numberMainBox,
        Number(display)
      );

      setNumberMainBox(calcResult);
      setDisplay(`${calcResult}`);
    }

    setLastOperator(operator);
    setIsLastInputOperator(true);

    if (operator === "reset") {
      // XXX: setNumberMainBoxの直後、numberMainBoxが更新されてるとは限らない
      setNumberMainBox(null);
      setDisplay("");
      setLastOperator(null);
      setIsLastInputOperator(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>電卓</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div className="grid grid-cols-4 gap-3">
            <NumberDisplay display={display} />
            <NumberButton num={7} onPressNumber={pressNumber} />
            <NumberButton num={8} onPressNumber={pressNumber} />
            <NumberButton num={9} onPressNumber={pressNumber} />
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("reset")}
            >
              🐰
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(4)}
            >
              4
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(5)}
            >
              5
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(6)}
            >
              6
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("=")}
            >
              =
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(1)}
            >
              1
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(2)}
            >
              2
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(3)}
            >
              3
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("+")}
            >
              +
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressNumber(0)}
            >
              0
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("÷")}
            >
              ÷
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("×")}
            >
              ×
            </button>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => pressOperator("-")}
            >
              -
            </button>
          </div>
        </h1>
      </main>
    </div>
  );
};

export default Home;
