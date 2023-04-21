import { Meta, StoryObj } from "@storybook/react";
import Editor from "../budget-statement/editor";
import { utils } from "@acaldas/document-model-libs/browser/budget-statement";

const initialAccount = utils.createAccount({
    address: "eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f",
    name: "Grants Program",
    lineItems: [
        {
            category: {
                ref: "makerdao/budget-category",
                id: "CommunityDevelopmentExpense",
                title: "Community Development Expense",
            },
            headcountExpense: false,
            group: {
                ref: "makerdao/project",
                id: "core-unit/SES/2023/005",
                title: "Core Unit Operational Support",
            },
            budgetCap: 100000,
            payment: 0,
            actual: 25025,
            forecast: [
                {
                    month: "2023/02",
                    value: 30000,
                    budgetCap: 3000,
                },
                {
                    month: "2023/03",
                    value: 30000,
                    budgetCap: 3000,
                },
                {
                    month: "2023/04",
                    value: 20000,
                    budgetCap: 3000,
                },
            ],
            comment: "",
        },
    ],
});

const meta = {
    title: "BudgetStatement",
    component: Editor,
    args: {
        budgetStatement: {
            data: { accounts: [initialAccount] },
        },
    },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddAccount: Story = {};
