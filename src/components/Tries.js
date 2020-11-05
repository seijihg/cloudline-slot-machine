import React from "react";
import { useSelector } from "react-redux";

// TASK
// Display the number of tries, i.e 'You've tried x times'

const Tries = () => {
  const tally = useSelector(state => state.tally);
  return (
    <div style={{margin: "1rem"}}>
      {`You have tried ${tally.tries} times`}
    </div>
  );
}

export default Tries;
