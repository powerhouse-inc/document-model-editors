import { BudgetStatementDocument } from '@acaldas/document-model-libs/browser/budget-statement';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/manager-api';
import React, { useEffect, useState } from 'react';

const ADDON_ID = 'Operations';
const PANEL_ID = `${ADDON_ID}/panel`;

const OperationsPanel = (
    { operations }: { operations: BudgetStatementDocument['operations'] } // TODO export
) => (
    <table
        style={{
            width: '100%',
            textAlign: 'left',
        }}
    >
        <thead>
            <tr>
                <th>Type</th>
                <th>Input</th>
                <th>Index</th>
                <th>Timestamp</th>
                <th>Hash</th>
            </tr>
        </thead>
        <tbody>
            {operations.map(op => (
                <tr key={op.index}>
                    <td>{op.type}</td>
                    <td>
                        <pre
                            style={{
                                margin: '0 10px',
                                padding: 0,
                                maxHeight: 200,
                                overflow: 'auto',
                                background: 'rgba(100,100,100,0.2)',
                            }}
                        >
                            {JSON.stringify(op.input, null, 2)}
                        </pre>
                    </td>
                    <td>{op.index}</td>
                    <td>{new Date(op.timestamp).toISOString()}</td>
                    <td>{op.hash}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

addons.register(ADDON_ID, api => {
    const channel = api.getChannel();
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Operations',
        render: ({ active, key }) => {
            const [budgetStatement, setBudgetStatement] =
                useState<BudgetStatementDocument>();
            useEffect(() => {
                channel?.addListener('BUDGET_STATEMENT', setBudgetStatement);
                return () =>
                    channel?.removeListener(
                        'BUDGET_STATEMENT',
                        setBudgetStatement
                    );
            }, [channel]);

            return (
                <AddonPanel active={active ?? false} key={key}>
                    {budgetStatement && (
                        <OperationsPanel
                            operations={budgetStatement.operations}
                        />
                    )}
                </AddonPanel>
            );
        },
    });
});
