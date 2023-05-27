import {
    BudgetStatementDocument,
    reducer as BudgetStatementReducer,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { useDocumentReducer } from '../base';

export default function useBudgetStatementReducer(
    initialState: Partial<
        Omit<BudgetStatementDocument, 'data'> & {
            data: Partial<BudgetStatementDocument['data']>;
        }
    >
) {
    return useDocumentReducer(
        BudgetStatementReducer,
        initialState,
        utils.createBudgetStatement
    );
}
