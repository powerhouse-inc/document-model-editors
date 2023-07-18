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
import TextInput from '../common/textInputVariant';
import { EditorProps } from "../common";
import type { BaseAction } from "@acaldas/document-model-libs/document";

export interface IProps extends EditorProps {
    scopeFramework: ExtendedScopeFrameworkState;
    dispatch: (action: ScopeFrameworkAction | BaseAction) => void;
}

const getHighestPathWithPrefix = (prefix: string, paths: string[]) => {
    prefix += '.';
    let result = 0, pLength = prefix.length;
    
    paths.filter(p => p.startsWith(prefix)).forEach(p => {
        const value = parseInt(p.slice(pLength).split('.', 2)[0]);
        if (value > result) {
            result = value;
        }
    });

    return result;
}

const getNextPath = (state: ExtendedScopeFrameworkState, type: types.ScopeFrameworkElementType): string => {
    const 
        result = [state.data.rootPath], 
        paths = state.data.elements.map(e => e.path);

    if (type == 'Scope') {
        result.push(getHighestPathWithPrefix(result[0], paths) + 1 + '');
    }
    
    if (type == 'Article') {
        result.push(getHighestPathWithPrefix(result[0], paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + 1 + '');
    }

    if (type == 'Section') {
        result.push(getHighestPathWithPrefix(result[0], paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + 1 + '');
    }

    if (type == 'Core') {
        result.push(getHighestPathWithPrefix(result[0], paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + '');
        result.push(getHighestPathWithPrefix(result.join('.'), paths) + 1 + '');
    }

    return result.join('.');
}

function Editor(props: IProps) {
    const {scopeFramework: state, dispatch, editorContext} = props;

    useEffect(() => {
        if (state.revision < 1) {
            dispatch(actions.setName('MakerDAO Atlas'));
        }
    });

    const handleNameUpdate = (id:string, name:string) => dispatch(actions.updateElementName({id, name}));
    
    const handleTypeUpdate = (id:string, type: types.ScopeFrameworkElementType) => 
        dispatch(actions.updateElementType({id, type}));
    
    const handleComponentsUpdate = (id:string, components:Record<string, string>) => dispatch(actions.updateElementComponents({
        id, 
        components: { content: components['content'] }
    }));
    
    const handleDelete = (id:string) => {
        const elements = state.data.elements.filter(e => e.id == id);
        if (elements.length == 1 && elements[0].type !== 'Scope') {
            dispatch(actions.removeElement({id}));
        }
    };

    const handleAddArticle = () => {
        dispatch(actions.addElement({
            type: 'Article',
            path: getNextPath(state, 'Article'),
            name: null,
            components: {
                content: null
            }
        }));
    }

    const handleAddSection = () => {
        dispatch(actions.addElement({
            type: 'Section',
            path: getNextPath(state, 'Section'),
            name: null,
            components: {
                content: null
            }
        }));
    }

    const handleAddCore = () => {
        dispatch(actions.addElement({
            type: 'Core',
            path: getNextPath(state, 'Core'),
            name: null,
            components: {
                content: null
            }
        }));
    }

    const handleSetDocumentName = (name:string) => {
        dispatch(actions.setName(name));
    }

    const handleSetRootPath = (newRootPath:string) => {
        dispatch(actions.setRootPath({newRootPath}));
    }

    return (
        <DocumentEditor mode={editorContext.theme}>
            <EditorToolbar
                key="toolbar"
                left={[
                    <ToolbarButton key="undo" onClick={() => dispatch(actions.undo(1))}>↺ undo</ToolbarButton>,
                    <ToolbarButton key="redo" onClick={() => dispatch(actions.redo(1))}>↻ redo</ToolbarButton>
                ]}
                center={[
                    <ToolbarButton key="art" onClick={handleAddArticle}>＋ add article</ToolbarButton>,
                    <ToolbarButton key="sct" onClick={handleAddSection}>＋ add section</ToolbarButton>,
                    <ToolbarButton key="sct" onClick={handleAddCore}>＋ add core</ToolbarButton>,
                ]}
                right={[
                    <ToolbarButton key="rev">revision history</ToolbarButton>
                ]}
            />
            <EditorWorksheet key="sheet">
                <div key="header-left" className="editor-worksheet--header-left">
                    <TextInput 
                        key="doc-title"
                        value={state.name}
                        size="huge"
                        theme={editorContext.theme}
                        onSubmit={handleSetDocumentName}
                    />
                    <p key="lastModified">Last Modified: {state.lastModified.toString().slice(0, 16).replace('T', ' ')} UTC &ndash; Version: {state.revision}</p>
                </div>
                <div key="header-right" className="editor-worksheet--header-right">
                    <TextInput 
                            key="doc-title"
                            value={state.data.rootPath}
                            size="chapter"
                            theme={editorContext.theme}
                            onSubmit={handleSetRootPath}
                    />
                </div>
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
