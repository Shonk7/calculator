import { ACTIONS } from "../App";

interface Props {
  dispatch: any;
  className?: string;
}
export default function ClearButton({ dispatch, className = "" }: Props) {
  return (
    <button
      className={className}
      onClick={() => dispatch({ type: ACTIONS.CLEAR, payload: {} })}
    >
      AC
    </button>
  );
}
