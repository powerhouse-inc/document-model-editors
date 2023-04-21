import {
    BudgetStatementDocument,
    reducer as BudgetStatementReducer,
    State,
    utils,
} from "@acaldas/document-model-libs/browser/budget-statement";
import { useReducer } from "react";

type InitialState = Partial<
    Omit<BudgetStatementDocument, "data"> & {
        data: Partial<State>;
    }
>;
type Action = Parameters<typeof BudgetStatementReducer>[1];
type ResetAction = {
    type: "_REACT_RESET";
    input: Parameters<typeof BudgetStatementReducer>[0];
};

const reducer = (
    state: Parameters<typeof BudgetStatementReducer>[0],
    action: Action | ResetAction
): ReturnType<typeof BudgetStatementReducer> => {
    if (action.type === "_REACT_RESET") {
        return action.input;
    }
    return BudgetStatementReducer(state, action);
};

export default function useBudgetStatementReducer(
    initialState: InitialState = {}
) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState,
        utils.createBudgetStatement
    );

    return [
        state,
        (action: Action) => dispatch(action),
        (budgetStatement: Parameters<typeof BudgetStatementReducer>[0]) =>
            dispatch({ type: "_REACT_RESET", input: budgetStatement }),
    ] as const;
}
