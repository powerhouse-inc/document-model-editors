import { z } from "zod";
import EditorOperation from "./components/editor-operation";
import EditorSchema from "./components/editor-schema";
import { useState } from "react";
import EditorScenario from "./components/editor-scenario";

type State = {
    documentName: string;
    schema: string;
    validator: () => z.ZodObject<any>;
    operationName?: string;
    operationSchema?: string;
    operationValidator?: () => z.ZodObject<any>;
    operationScenario?: string;
};

function Editor() {
    const [state, setState] = useState<State>();

    return (
        <div style={{ display: "flex", flex: "row", gap: "2vw" }}>
            <div style={{ width: "30vw" }}>
                <h2>Create Document</h2>
                <EditorSchema
                    onCreate={(created) =>
                        setState((state) => ({ ...state, ...created }))
                    }
                />
            </div>
            <div style={{ width: "30vw" }}>
                <h2>Create Operation</h2>
                {state?.documentName && !!state.validator && (
                    <EditorOperation
                        {...state}
                        onCreate={(created) =>
                            setState((state) => ({ ...state!, ...created }))
                        }
                    />
                )}
            </div>
            <div style={{ width: "30vw" }}>
                <h2>Create Scenario</h2>
                {state?.operationName && !!state.operationValidator && (
                    <EditorScenario
                        operationName={state.operationName}
                        validator={state.validator}
                        operationValidator={state.operationValidator}
                        onCreate={(created) =>
                            setState((state) => ({ ...state!, ...created }))
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Editor;
