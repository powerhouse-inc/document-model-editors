import React, { PropsWithChildren, CSSProperties, useEffect } from "react";
import useScopeFrameworkReducer from "./reducer";
import { actions } from '@acaldas/document-model-libs/browser/scope-framework';
import DocumentEditor from "../common/documentEditor";
import EditorToolbar from "../common/editorToolbar";
import "../common/styles.css"
import ToolbarButton from "../common/toolbarButton";
import EditorWorksheet from "../common/editorWorksheet";

interface EditorProps {
    debug? : boolean,
    mode: 'light' | 'dark'
}

function Editor(props: EditorProps) {
    const [state, dispatch, reset] = useScopeFrameworkReducer();

    return (
        <DocumentEditor mode={props.mode}>
            <EditorToolbar
                left={[
                    <ToolbarButton>Button 1</ToolbarButton>,
                    <ToolbarButton>Button 2</ToolbarButton>
                ]}
                center={[
                    <ToolbarButton>Button 3</ToolbarButton>,
                    <ToolbarButton>Button 4</ToolbarButton>
                ]}
                right={[
                    <ToolbarButton>Button 5</ToolbarButton>,
                    <ToolbarButton>Button 6</ToolbarButton>
                ]}
            />
            <EditorWorksheet>
                <h1>{state.data.elements[0].name}</h1>
                <p>{state.data.elements[0].components?.content}</p>
                {'This is a test... '.repeat(1000)}
            </EditorWorksheet>
        </DocumentEditor>
    );
}

export default Editor;

/*
<div style={{minHeight: '4em'}}>
                Scope Framework Root Path: {state.data.rootPath}
            </div>
            { props.debug ?
                <code 
                    key='stateView' 
                    style={{
                        maxWidth: '60em', 
                        margin: '4em auto', 
                        maxHeight: '25em', 
                        overflowY: 'scroll', 
                        display: 'block', 
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        lineHeight: '1.7'
                    }}>{JSON.stringify(state, null, 2)}</code>
                : '' 
            }
*/