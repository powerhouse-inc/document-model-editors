import { Document } from '@acaldas/document-model-libs/browser/document';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/manager-api';
import React from 'react';

const ADDON_ID = 'Operations';
const PANEL_ID = `${ADDON_ID}/panel`;

const OperationsPanel = (
    { operations }: { operations: Document['operations'] } // TODO export
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
                React.useState<Document>();
            React.useEffect(() => {
                channel?.addListener('DOCUMENT', setBudgetStatement);
                return () =>
                    channel?.removeListener('DOCUMENT', setBudgetStatement);
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
