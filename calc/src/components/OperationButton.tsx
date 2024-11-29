import { ACTIONS } from "../App";

interface Props {
  dispatch: any;
  operation: string;
  className?: string;
}
export default function OperationButton({
  dispatch,
  operation,
  className = "",
}: Props) {
  return (
    <button
      className={className}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
