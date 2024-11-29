import { useReducer } from "react";
import "./App.css";
import DigitButton from "./components/DigitButton";
import ClearButton from "./components/ClearButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",
} as const;

function reducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "",
        prevOperand: "",
        operation: "",
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === "" && state.prevOperand === "") {
        return state;
      }
      if (state.prevOperand === "") {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: "",
        };
      }

    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "", prevOperand: "", operation: "" }
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {prevOperand}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <ClearButton className="span-two" dispatch={dispatch} />
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      {/* <DigitButton digit="÷" dispatch={dispatch} /> */}
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton className="span-two" digit="0" dispatch={dispatch} />
      {/* <button className="span-two">0</button> */}
      <DigitButton digit="." dispatch={dispatch} />
      <button>=</button>
    </div>
  );
}

export default App;
