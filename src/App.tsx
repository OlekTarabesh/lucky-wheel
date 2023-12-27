import { CSSProperties, useState } from "react";

import { prices } from "./data";
import styled from "./App.module.css";

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [num, setNum] = useState<number>(Math.ceil(Math.random() * 5000) / 60);

  const spinWheel = (): void => {
    setResult("");
    setNum((prev) => (prev += Math.ceil(Math.random() * 5000)));
    const randomNumber: number = Math.random();
    let cumulativeProbability: number = 0;

    for (const prize of prices) {
      cumulativeProbability += prize.probability;

      if (randomNumber <= cumulativeProbability) {
        setTimeout(() => {
          setResult(prize.value);
        }, 5000);
        break;
      }
    }
  };
  return (
    <div className={styled.wrapper}>
      <div className={styled.app}>
        <div className={styled.arrow}>⭕️</div>
        <div
          className={styled.wheel}
          style={{ transform: `rotate(${num}deg)` } as CSSProperties}
        >
          {prices.map((item) => (
            <div
              key={item.id}
              className={styled.valueContainer}
              style={
                {
                  "--value": item.id,
                } as CSSProperties
              }
            >
              <div className={styled.value}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={spinWheel}>Spin</button>
      <div>
        <h2>Result:</h2>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default App;
