import {
    BudgetStatementAction,
    BudgetStatementDocument,
    BudgetStatementState,
    reducer,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { useDocumentReducer } from '../../common';

export default function useBudgetStatementReducer(
    document: BudgetStatementDocument = utils.createBudgetStatement(),
    onError?: (error: unknown) => void
) {
    return useDocumentReducer<BudgetStatementState, BudgetStatementAction>(
        reducer,
        document,
        onError
    );
}
