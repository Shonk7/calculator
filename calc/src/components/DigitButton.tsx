import { ACTIONS } from "../App";

interface Props {
  dispatch: any;
  digit: string;
  className?: string;
}
export default function DigitButton({
  dispatch,
  digit,
  className = "",
}: Props) {
  return (
    <button
      className={className}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
