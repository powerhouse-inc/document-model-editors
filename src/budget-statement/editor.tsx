import {
    Account,
    AccountInput,
    BudgetStatementDocument,
    LineItem,
    State,
    actions,
} from "@acaldas/document-model-libs/browser/budget-statement";
import useBudgetStatementReducer from "./reducer";
import { useEffect, useMemo, useState } from "react";

const Currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const categories = [
    {
        ref: "makerdao/budget-category",
        id: "CompensationAndBenefits",
        title: "Compensation & Benefits",
        headcountExpense: true,
    },
    {
        ref: "makerdao/budget-category",
        id: "TravelAndEntertainment",
        title: "Travel & Entertainment",
        headcountExpense: true,
    },
    {
        ref: "makerdao/budget-category",
        id: "SoftwareDevelopmentExpense",
        title: "Software Development Expense",
        headcountExpense: false,
    },
    {
        ref: "makerdao/budget-category",
        id: "GasExpense",
        title: "Gas Expense",
        headcountExpense: true,
    },
];

const groups = [
    {
        ref: "makerdao/project",
        id: "Powerhouse",
        title: "Powerhouse",
    },
    {
        ref: "makerdao/project",
        id: "LegalResearch",
        title: "Legal Research",
    },
    {
        ref: "makerdao/project",
        id: "MakerAcademy",
        title: "Maker Academy",
    },
];

const AccountsTable: React.FC<{
    data: State;
    onDeleteAccount?: (account: string) => void;
    onDeleteLineItem?: (
        account: string,
        lineItem: Pick<LineItem, "category" | "group">
    ) => void;
}> = ({ data, onDeleteAccount, onDeleteLineItem }) => {
    const accounts = data.accounts;
    const accountStats = useMemo(
        () =>
            accounts.map(({ address, name, lineItems }) => {
                const { actuals, payments } = lineItems.reduce(
                    (acc, curr) => ({
                        actuals: acc.actuals + (curr.actual || 0),
                        payments: acc.payments + (curr.payment || 0),
                    }),
                    { actuals: 0, payments: 0 }
                );

                return { address, name, actuals, payments };
            }),
        [accounts]
    );

    return (
        <div>
            <h2>Accounts:</h2>
            <table style={{ borderSpacing: 12 }}>
                <thead>
                    <tr>
                        <th align="left">Name</th>
                        <th align="left">Address</th>
                        <th align="left">Actuals</th>
                        <th align="left">Payments</th>
                    </tr>
                </thead>
                <tbody>
                    {accountStats.map((account) => (
                        <tr key={account.address}>
                            <td>{account.name}</td>
                            <td>{account.address.slice(0, 10)}...</td>
                            <td>{Currency.format(account.actuals)}</td>
                            <td>{Currency.format(account.payments)}</td>
                            {onDeleteAccount && (
                                <td>
                                    <button
                                        onClick={() =>
                                            onDeleteAccount(account.address)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const AccountForm: React.FC<{
    accounts: Account[];
    addAccount: (account: AccountInput) => void;
}> = ({ accounts, addAccount }) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        addAccount(formJson as unknown as AccountInput);
    }

    return (
        <form
            key={accounts.length}
            method="post"
            onSubmit={handleSubmit}
            style={{ maxWidth: 300 }}
        >
            <label>
                Address: <input name="address" placeholder="eth:0x..." />
            </label>
            <pre />
            <label>
                Name: <input name="name" placeholder="" />
            </label>
            <pre />
            <button type="submit">Submit</button>
        </form>
    );
};

const LineItemForm: React.FC<{
    accounts: Account[];
    addLineItem: (
        account: string,
        lineItem: Partial<LineItem> & Pick<LineItem, "category" | "group">
    ) => void;
}> = ({ accounts, addLineItem }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>(
        accounts.length ? accounts[0].address : ""
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        addLineItem(formData.get("account")!.toString(), {
            budgetCap: parseFloat(formJson["budgetCap"].toString()),
            actual: parseFloat(formJson["actual"].toString()),
            payment: parseFloat(formJson["payment"].toString()),
            category: categories.find(
                (c) => c.id === formJson["category"].toString()
            )!,
            group: groups.find((g) => g.id === formJson["group"].toString())!,
        });
    }

    return (
        <form
            key={
                accounts.find((a) => a.address === selectedAccount)?.lineItems
                    .length
            }
            method="post"
            onSubmit={handleSubmit}
            style={{ maxWidth: 300 }}
        >
            <label>
                Select account:{" "}
                <select
                    name="account"
                    value={selectedAccount ?? ""}
                    onChange={(e) =>
                        setSelectedAccount(
                            (e.target as HTMLSelectElement).value
                        )
                    }
                >
                    {accounts.map((account) => (
                        <option value={account.address}>{account.name}</option>
                    ))}
                </select>
            </label>
            <pre />
            <label>
                Category:{" "}
                <select name="category">
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </label>
            <pre />
            <label>
                Group:{" "}
                <select name="group">
                    {groups.map((group) => (
                        <option value={group.id} key={group.id}>
                            {group.title}
                        </option>
                    ))}
                </select>
            </label>
            <pre />
            <label>
                Budget Cap:{" "}
                <input name="budgetCap" type="number" placeholder="0" />
            </label>
            <pre />
            <label>
                Payment: <input name="payment" type="number" placeholder="0" />
            </label>
            <pre />
            <label>
                Actual: <input name="actual" type="number" placeholder="0" />
            </label>
            <pre />
            <button type="submit">Submit</button>
        </form>
    );
};

interface IProps {
    budgetStatement: Parameters<typeof useBudgetStatementReducer>[0];
    onChange?: (budgetStatement: BudgetStatementDocument) => void;
    onDeleteAccount?: (account: string) => void;
    onDeleteLineItem?: (
        account: string,
        lineItem: Pick<LineItem, "category" | "group">
    ) => void;
}

const Editor: React.FC<IProps> = ({
    budgetStatement,
    onChange,
    onDeleteAccount,
    onDeleteLineItem,
}) => {
    const [state, dispatch, reset] = useBudgetStatementReducer(budgetStatement);

    useEffect(() => {
        if (budgetStatement) {
            reset(budgetStatement);
        }
    }, [budgetStatement]);

    const accounts = state.data.accounts;

    function addAccount(account: AccountInput) {
        dispatch(actions.addAccount([account]));
    }

    function addLineItem(
        account: string,
        lineItem: Partial<LineItem> & Pick<LineItem, "category" | "group">
    ) {
        dispatch(actions.addLineItem(account, [lineItem]));
    }

    function deleteAccount(account: string) {
        dispatch(actions.deleteAccount([account]));
        onDeleteAccount?.(account);
    }

    useEffect(() => {
        onChange?.(state);
    }, [onChange, state]);

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
