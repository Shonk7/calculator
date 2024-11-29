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
  INVERSE: "inverse",
  PERCENTAGE: "percentage",
} as const;

interface State {
  currentOperand: string;
  prevOperand: string;
  operation: string;
  overwrite: boolean;
}

function reducer(state: State, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
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
      if (state.currentOperand === ".") {
        return state;
      }
      if (state.currentOperand === "" && state.prevOperand === "") {
        return state;
      }
      if (state.currentOperand === "") {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.prevOperand === "") {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: "",
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "",
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation === "" ||
        state.currentOperand === "" ||
        state.prevOperand === ""
      ) {
        return state;
      }
      return {
        ...state,
        prevOperand: "",
        operation: "",
        currentOperand: evaluate(state),
        overwrite: true,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: "",
        };
      }
      if (state.currentOperand === "") return state;
      // if (state.currentOperand.length === 1) {
      //   return { ...state, currentOperand: "" };
      // }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.INVERSE:
      return {
        ...state,
        overwrite: false,
        currentOperand: String(parseFloat(state.currentOperand) * -1),
      };

    case ACTIONS.PERCENTAGE:
      return {
        ...state,
        overwrite: false,
        currentOperand: String(parseFloat(state.currentOperand) / 100),
      };

    default:
      return state;
  }
}

function evaluate(state: State) {
  const prev = parseFloat(state.prevOperand);
  const current = parseFloat(state.currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";
  let compute = "";
  switch (state.operation) {
    case "+":
      compute = String(prev + current);
      break;
    case "-":
      compute = String(prev - current);
      break;
    case "×":
      compute = String(prev * current);
      break;
    case "÷":
      compute = String(prev / current);
      break;
  }
  return compute;
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

// Adding commas
function formatOperand(operand: string) {
  if (operand === "") return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer));
  return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`;
}
function App() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "", prevOperand: "", operation: "", overwrite: false }
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(prevOperand)}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <ClearButton dispatch={dispatch} />
      {/* <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button> */}
      <button onClick={() => dispatch({ type: ACTIONS.INVERSE })}>+/-</button>
      <button onClick={() => dispatch({ type: ACTIONS.PERCENTAGE })}>%</button>
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
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
