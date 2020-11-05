import React from "react";
import { useSelector } from "react-redux";

// TASK
// Display the number of wins, i.e 'You've won x times'

const Wins = () => {
  const tally = useSelector(state => state.tally);
return (
  <>
    <div>
      {`You've won ${tally.wins} times`}
    </div>
  </>
);
}

export default Wins;
