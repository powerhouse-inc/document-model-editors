export type EditorContext = {
    theme: 'light' | 'dark';
};

export type EditorProps = {
    editorContext: EditorContext;
};

export { useDocumentReducer } from './reducer';
