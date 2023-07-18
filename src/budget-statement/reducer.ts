import {
    BudgetStatementAction,
    BudgetStatementDocument,
    reducer as BudgetStatementReducer,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { useDocumentReducer } from '../common';

export default function useBudgetStatementReducer(
    initialState: BudgetStatementDocument = utils.createBudgetStatement()
) {
    return useDocumentReducer<
        BudgetStatementDocument['data'],
        BudgetStatementAction
    >(BudgetStatementReducer, initialState);
}
