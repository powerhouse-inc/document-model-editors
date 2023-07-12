import {
    AccountInput,
    actions,
    BudgetStatementAction,
    BudgetStatementDocument,
    LineItem,
} from '@acaldas/document-model-libs/browser/budget-statement';
import type { EditorProps } from '../base';
import AccountForm from './components/account-form';
import AccountsTable from './components/accounts-table';
import LineItemForm from './components/line-item-form';

interface IProps extends EditorProps {
    budgetStatement: BudgetStatementDocument;
    dispatch: (action: BudgetStatementAction) => void;
}

const Editor: React.FC<IProps> = ({ budgetStatement, dispatch }) => {
    function addAccount(account: AccountInput) {
        dispatch(actions.addAccount([account]));
    }

    function addLineItem(
        account: string,
        lineItem: Partial<LineItem> & Pick<LineItem, 'category' | 'group'>
    ) {
        dispatch(actions.addLineItem(account, [lineItem]));
    }

    function deleteAccount(account: string) {
        dispatch(actions.deleteAccount([account]));
    }

    function deleteLineItem(
        account: string,
        lineItem: { category?: string; group?: string }
    ) {
        dispatch(actions.deleteLineItem(account, [lineItem]));
    }

    const accounts = budgetStatement.data.accounts;

    return (
        <div>
            <AccountsTable
                data={budgetStatement.data}
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
};

export default Editor;
