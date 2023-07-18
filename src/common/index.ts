export type EditorContext = {
    theme: 'light' | 'dark';
    debug?: boolean;
};

export type EditorProps = {
    editorContext: EditorContext;
};

export { useDocumentReducer } from './reducer';
