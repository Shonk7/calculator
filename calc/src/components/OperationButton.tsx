import { ACTIONS } from "../App";

interface Props {
  dispatch: any;
  operation: string;
  className?: string;
}
export default function OperationButton({ dispatch, operation }: Props) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
