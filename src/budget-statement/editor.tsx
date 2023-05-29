import {
    AccountInput,
    actions,
    BudgetStatementDocument,
    LineItem,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { useEffect } from 'react';
import type { EditorProps } from '../base';
import AccountForm from './components/account-form';
import AccountsTable from './components/accounts-table';
import LineItemForm from './components/line-item-form';
import useBudgetStatementReducer from './reducer';

interface IProps extends EditorProps {
    budgetStatement: BudgetStatementDocument;
    onChange?: (budgetStatement: BudgetStatementDocument) => void;
    onDeleteAccount?: (account: string) => void;
    onDeleteLineItem?: (
        account: string,
        lineItem: Pick<LineItem, 'category' | 'group'>
    ) => void;
}

const Editor: React.FC<IProps> = ({
    budgetStatement,
    onChange,
    onDeleteAccount,
    onDeleteLineItem,
}) => {
    const [state, dispatch, reset] = useBudgetStatementReducer(budgetStatement);

    // resets the budget state in the reducer when the prop changes
    useEffect(() => {
        if (budgetStatement) {
            reset(budgetStatement);
        }
    }, [budgetStatement]);

    // notifies the parent component when the budget statement changes
    useEffect(() => {
        onChange?.(state);
    }, [onChange, state]);

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
        onDeleteAccount?.(account);
    }

    const accounts = state.data.accounts;

    return (
        <div>
            <AccountsTable
                data={state.data}
                onDeleteAccount={deleteAccount}
                onDeleteLineItem={onDeleteLineItem}
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
