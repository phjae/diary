import React, { useEffect, useState } from "react";

const CounterA = ({ count }) => {
  useEffect(() => {
    console.log(`update :: count  : ${count}`);
  });
  return <>{count}</>;
};

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`update :: countB  : ${obj.count}`);
  });
  return <>{obj.count}</>;
};
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div>
      <div>
        <h2>counter a</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>a button</button>
      </div>
      <div>
        <h2>counter b</h2>
        <CounterB obj={obj} />
        <button onClick={() => setObj(obj.count)}>b button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
