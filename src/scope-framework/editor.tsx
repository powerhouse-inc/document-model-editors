import React, { PropsWithChildren, CSSProperties, useEffect } from "react";
import useScopeFrameworkReducer from "./reducer";
import { actions } from '@acaldas/document-model-libs/browser/scope-framework';
import DocumentEditor from "../common/documentEditor";
import EditorToolbar from "../common/editorToolbar";
import "../common/styles.css"
import "./style.css";
import ToolbarButton from "../common/toolbarButton";
import EditorWorksheet from "../common/editorWorksheet";
import AtlasElement from "./components/atlasElement";

interface EditorProps {
    debug? : boolean,
    mode: 'light' | 'dark'
}

function Editor(props: EditorProps) {
    const [state, dispatch, reset] = useScopeFrameworkReducer();

    return (
        <DocumentEditor mode={props.mode}>
            <EditorToolbar
                key="toolbar"
                left={[
                    <ToolbarButton>table of contents</ToolbarButton>,
                    <ToolbarButton>edit mode</ToolbarButton>
                ]}
                center={[]}
                right={[
                    <ToolbarButton>revision history</ToolbarButton>
                ]}
            />
            <EditorWorksheet key="sheet">
                <h1 key="title">MakerDAO Atlas</h1>
                <p key="lastModified">Last Modified: {state.lastModified.toString().slice(0, 16).replace('T', ' ')} UTC</p>
                {state.data.elements.map(d => <AtlasElement key={d.id} element={d}/>)}
                { props.debug ?
                    <code 
                        key='stateView' 
                        style={{
                            maxWidth: '60em', 
                            margin: '4em auto', 
                            padding: '2em 0',
                            display: 'block', 
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace',
                            lineHeight: '1.7',
                            borderTop: '1px solid #aaa'
                        }}>{JSON.stringify(state, null, 2)}</code>
                    : '' 
                }
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