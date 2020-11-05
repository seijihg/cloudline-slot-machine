import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWins, addToTries, resetTally } from "../actions/tallyActions";
import Tries from "./Tries";
import Wins from "./Wins";

const Parent = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #dcdcf3;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SubDiv = styled.div`
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;
  border-radius: 10px;
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
  border-radius: 10px;
`;

const Slots = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Slot = styled.div`
  height: 250px;
  width: 180px;
  border: 2px solid white;
  border-radius: 10px;
  background: red;
  margin: .5rem;
  padding: .5rem;
  transition: all 500ms;
`;

const Spin = styled.button`
  margin-top: 1rem;
  border-radius: 10px;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  background: blue;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;

const Tally = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
  background: white;
  border-radius: 10px;
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector(state => state.tally);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  const baseColors = ["red", "blue", "yellow"];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(["grey", "grey", "grey"]);

  // TASK
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))

  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.

  const spin = () => {

    const colours = []
    let i = 0
    // Randomizing the the colours.
    while (i < 3) {
      const colour = baseColors[Math.floor(Math.random() * baseColors.length)]
      colours.push(colour)
      i++
    }
    
    dispatch(addToTries())
    
    // Set state with randomized colours.
    setColors(colours)

    // Check here if all colours are the same.
    if (colours.every(c => c === colours[0])) {
      dispatch(addToWins())
    }
  }

  // TASK
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.
  useEffect(() => {

    // Quick condition to check to reset numbers
    if (tally.wins === 5) {
      if (window.confirm("Stop Gambling!")) {
        dispatch(resetTally())
      }
    }

  }, [tally.wins, dispatch]);

  // TASK
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)


  return (
    <Parent className="parent">
      <SubDiv className="subdiv-slot">
        <Slots className="slots">
          {newColors.map((colour) => <Slot key={Math.random()}  className="slot" style={{backgroundColor: `${colour}`, transition: "all 1000ms"}}></Slot> )}
        </Slots>

        <Spin onClick={() => spin()} className="spin" disabled={tally.wins === 5}>Spin!</Spin>
      </SubDiv>
      <SubDiv className="subdiv-slot">
        <Header>Tally</Header>
        <Tally>
          <Tries />
          <Wins />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
