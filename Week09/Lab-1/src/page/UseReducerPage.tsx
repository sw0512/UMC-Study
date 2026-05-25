import { useReducer, useState } from "react";

// state interface
interface IState {
  counter: number;
}
// reducer interface
interface IAction {
  type: "INCREMENT" | "DECREMENT" | "RESET_TO_ZERO";
}

function reducer(state: IState, action: IAction) {
  const { type } = action;
  switch (type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "RESET_TO_ZERO":
      return { ...state, counter: 0 };
    default:
      return state;
  }
}

function UseReducerPage() {
  // 1. useState
  const [count, setCount] = useState(0);
  // 1. useReducer
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-20 text-center justify-center items-center  ">
      <div>
        <h2>useState</h2>
        <h3 className="text-2xl">Count: {count}</h3>
        <button
          className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
      <div>
        <h2>useReducer</h2>
        <h3 className="text-2xl">Count: {state.counter}</h3>
        <button
          className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          Increment
        </button>
        <button
          className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => dispatch({ type: "DECREMENT" })}
        >
          Decrement
        </button>
        <button
          className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => dispatch({ type: "RESET_TO_ZERO" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default UseReducerPage;
