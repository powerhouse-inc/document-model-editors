import {
    BudgetStatementDocument,
    State,
    reducer,
    utils,
} from "@acaldas/document-model-libs/browser/budget-statement";
import { useReducer } from "react";

export default function useBudgetStatementReducer(
    initialState?: BudgetStatementDocument
) {
    return useReducer(reducer, initialState ?? utils.createBudgetStatement());
}
