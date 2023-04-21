import React from "react";

import { addons, types, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { Document } from "@acaldas/document-model-libs/browser";

const ADDON_ID = "Operations";
const PANEL_ID = `${ADDON_ID}/panel`;

const OperationsPanel = (
    { operations }: { operations: Array<Document.Operation> } // TODO export
) => <div>{JSON.stringify(operations)}</div>;

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: "Operations",
        render: ({ active, key }) => {
            const value = useParameter<any>("BUDGET_STATEMENT");
            return (
                <AddonPanel active={active ?? false} key={key}>
                    {value && (
                        <OperationsPanel operations={value.state.operations} />
                    )}
                    <p>OLE</p>
                </AddonPanel>
            );
        },
    });
});
