import {
    actions,
    BudgetStatementAction,
    BudgetStatementState,
    types,
} from '@acaldas/document-model-libs/browser/budget-statement';
import type { EditorProps } from '../../common';
import AccountForm from './components/account-form';
import AccountsTable from './components/accounts-table';
import LineItemForm from './components/line-item-form';

export type IProps = EditorProps<BudgetStatementState, BudgetStatementAction>;

function BudgetStatementEditor({
    document: budgetStatement,
    dispatch,
}: IProps) {
    function addAccount(account: types.AddAccountInput) {
        dispatch(actions.addAccount(account));
    }

    function addLineItem(lineItem: types.AddLineItemInput) {
        dispatch(actions.addLineItem(lineItem));
    }

    function deleteAccount(account: string) {
        dispatch(actions.deleteAccount({ account }));
    }

    function deleteLineItem(input: types.DeleteLineItemInput) {
        dispatch(actions.deleteLineItem(input));
    }

    const accounts = budgetStatement.state.accounts;

    return (
        <div>
            <AccountsTable
                data={budgetStatement.state}
                onDeleteAccount={deleteAccount}
                onDeleteLineItem={deleteLineItem}
            />
            <hr />
            <div>
                <h3>Add account</h3>
                <AccountForm accounts={accounts} addAccount={addAccount} />
            </div>
            <div>
                <h3>Add Line Item</h3>
                <LineItemForm accounts={accounts} addLineItem={addLineItem} />
            </div>
        </div>
    );
}

export default BudgetStatementEditor;
