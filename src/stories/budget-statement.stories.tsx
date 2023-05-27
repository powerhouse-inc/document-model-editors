import {
    BudgetStatementDocument,
    utils,
} from '@acaldas/document-model-libs/browser/budget-statement';
import { useArgs, useChannel } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import Editor, { IProps } from '../budget-statement/editor';

const initialAccount = utils.createAccount({
    address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
    name: 'Grants Program',
    lineItems: [
        {
            category: {
                ref: 'makerdao/budget-category',
                id: 'CommunityDevelopmentExpense',
                title: 'Community Development Expense',
            },
            headcountExpense: false,
            group: {
                ref: 'makerdao/project',
                id: 'core-unit/SES/2023/005',
                title: 'Core Unit Operational Support',
            },
            budgetCap: 100000,
            payment: 0,
            actual: 25025,
            forecast: [
                {
                    month: '2023/02',
                    value: 30000,
                    budgetCap: 3000,
                },
                {
                    month: '2023/03',
                    value: 30000,
                    budgetCap: 3000,
                },
                {
                    month: '2023/04',
                    value: 20000,
                    budgetCap: 3000,
                },
            ],
            comment: '',
        },
    ],
});

const budgetStatement = utils.createBudgetStatement({
    data: { accounts: [initialAccount] },
});

const meta = {
    title: 'BudgetStatement',
    component: Editor,
    render: () => {
        const [args, setArgs] = useArgs<IProps>();
        const emit = useChannel({});
        const handleChange = useMemo(
            () => (budgetStatement: BudgetStatementDocument) => {
                args.onChange?.(budgetStatement);
                setArgs({ budgetStatement });
                emit('BUDGET_STATEMENT', budgetStatement);
            },
            []
        );
        const darkTheme = args.editorContext.theme === 'dark';
        return (
            <div
                style={{
                    padding: '1em',
                    height: '100vh',
                    color: darkTheme ? 'white' : 'black',
                    backgroundColor: darkTheme ? '#1A1D1F' : 'white',
                }}
            >
                <Editor {...args} onChange={handleChange} />
            </div>
        );
    },
    argTypes: {
        budgetStatement: {
            control: 'object',
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        editorContext: {
            name: 'Theme',
            options: ['light', 'dark'],
            mapping: {
                light: {
                    theme: 'light',
                },
                dark: {
                    theme: 'dark',
                },
            },
            defaultValue: {
                theme: 'light',
            },
            control: 'inline-radio',
        },
    },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddAccount: Story = {
    args: {
        budgetStatement,
        editorContext: {
            theme: 'light',
        },
    },
};
