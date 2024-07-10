import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const GridProblem = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  );

  const queue = useRef([]);
  const divRef = useRef(false);

  const handleClick = (rowIdx, colIdx, flag) => {
    if (grid[rowIdx][colIdx] && flag) return;
    setGrid((prevGrid) => {
      const gridDeepCopy = prevGrid.map((arr) => [...arr]);
      gridDeepCopy[rowIdx][colIdx] = flag;
      flag && queue.current.push([rowIdx, colIdx]);

      return gridDeepCopy;
    });
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], Idx) => {
        setTimeout(() => {
          handleClick(rowIdx, colIdx, false);
          if (Idx === 8) divRef.current = false;
        }, 1000 * (Idx + 1));
      });

      divRef.current = true;
      //   queue.current = [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  return (
    <div className="gird--container">
      {grid.map((row, rowIdx) => {
        return row.map((col, colIdx) => {
          return (
            <div
              className={`grid--box ${col ? "active" : ""} ${
                divRef.current === true ? "disable--box" : ""
              }`}
              ref={divRef}
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleClick(rowIdx, colIdx, true)}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default GridProblem;
