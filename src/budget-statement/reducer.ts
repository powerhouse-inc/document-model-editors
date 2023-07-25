import {
    BudgetStatementAction,
    BudgetStatementDocument,
    BudgetStatementState,
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { BaseAction, Document } from '@acaldas/document-model-libs/document';
import { useDocumentReducer } from '../common';

export default function useBudgetStatementReducer(
    initialState: BudgetStatementDocument = utils.createBudgetStatement(),
    onError?: (error: unknown) => void
): readonly [
    BudgetStatementDocument,
    (action: BudgetStatementAction | BaseAction) => void,
    (
        state: Document<
            BudgetStatementState,
            BudgetStatementAction | BaseAction
        >
    ) => void
] {
    return useDocumentReducer<BudgetStatementState, BudgetStatementAction>(
        reducer,
        initialState,
        onError
    );
}
