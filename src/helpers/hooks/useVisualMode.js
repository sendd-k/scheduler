import { useState } from "react";

export default function useVisualMode(first) {
  const [mode, setMode] = useState(first);
  const [history, setHistory] = useState([first]);
  function transition(second, replace = false) {
    if (!replace) {
      setMode(second);
      setHistory((prev) => [...prev, second]);
    }
  }
  function back () {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  };
  return { mode, transition, back };
}


// else {
//   setMode(second);
//   setHistory((prev) => [...prev]);
// }