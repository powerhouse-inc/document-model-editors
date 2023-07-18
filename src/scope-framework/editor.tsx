import React, { PropsWithChildren, CSSProperties, useEffect } from "react";
import useScopeFrameworkReducer from "./reducer";
import { ExtendedScopeFrameworkState, ScopeFrameworkAction, actions, types } from '@acaldas/document-model-libs/browser/scope-framework';
import DocumentEditor from "../common/documentEditor";
import EditorToolbar from "../common/editorToolbar";
import "../common/styles.css"
import "./style.css";
import ToolbarButton from "../common/toolbarButton";
import EditorWorksheet from "../common/editorWorksheet";
import AtlasElement from "./components/atlasElement";
import { EditorProps } from "../common";
import type { BaseAction } from "@acaldas/document-model-libs/document";

export interface IProps extends EditorProps {
    scopeFramework: ExtendedScopeFrameworkState;
    dispatch: (action: ScopeFrameworkAction | BaseAction) => void;
}

function Editor(props: IProps) {
    const {scopeFramework: state, dispatch, editorContext} = props;

    const handleNameUpdate = (id:string, name:string) => dispatch(actions.updateElementName({id, name}));
    
    const handleTypeUpdate = (id:string, type: types.ScopeFrameworkElementType) => 
        dispatch(actions.updateElementType({id, type}));
    
    const handleComponentsUpdate = (id:string, components:Record<string, string>) => dispatch(actions.updateElementComponents({
        id, 
        components: { content: components['content'] }
    }));
    
    const handleDelete = (id:string) => dispatch(actions.removeElement({id}));

    const handleAddArticle = () => {
        dispatch(actions.addElement({
            type: 'Article',
            path: 'A.1.1',
            name: null,
            components: {
                content: null
            }
        }));
    }

    const handleAddSection = () => {
        dispatch(actions.addElement({
            type: 'Section',
            path: 'A.1.1.1',
            name: null,
            components: {
                content: null
            }
        }));
    }

    return (
        <DocumentEditor mode={editorContext.theme}>
            <EditorToolbar
                key="toolbar"
                left={[
                    <ToolbarButton key="toc" onClick={() => {dispatch(actions.moveElement({} as any))}}>table of contents</ToolbarButton>,
                    <ToolbarButton key="undo" onClick={() => dispatch(actions.undo(1))}>undo</ToolbarButton>,
                    <ToolbarButton key="redo" onClick={() => dispatch(actions.redo(1))}>redo</ToolbarButton>
                ]}
                center={[
                    <ToolbarButton key="art" onClick={handleAddArticle}>add article</ToolbarButton>,
                    <ToolbarButton key="sct" onClick={handleAddSection}>add section</ToolbarButton>
                ]}
                right={[
                    <ToolbarButton key="rev">revision history</ToolbarButton>
                ]}
            />
            <EditorWorksheet key="sheet">
                <h1 key="title">MakerDAO Atlas</h1>
                <p key="lastModified">Last Modified: {state.lastModified.toString().slice(0, 16).replace('T', ' ')} UTC</p>
                {state.data.elements.map(d => <AtlasElement 
                    key={d.id} 
                    element={d}
                    onUpdateName={handleNameUpdate}
                    onUpdateType={handleTypeUpdate}
                    onUpdateComponents={handleComponentsUpdate}
                    onDelete={handleDelete}
                    mode={props.editorContext.theme}
                />)}
                { editorContext.debug ?
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
                            borderTop: '1px solid #aaa',
                        }}
                    >
                        {JSON.stringify(state, null, 2)}
                    </code>
                 : (
                    ''
                )}
            </EditorWorksheet>
        </DocumentEditor>
    );
};

export default Editor;
