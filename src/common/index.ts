import {
    Action,
    BaseAction,
    Document,
} from '@acaldas/document-model-libs/document';

export type EditorContext = {
    theme: 'light' | 'dark';
    debug?: boolean;
};

export type EditorProps<S, A extends Action> = {
    document: Document<S, A | BaseAction>;
    dispatch: (action: A | BaseAction) => void;
    editorContext: EditorContext;
};

export { useDocumentReducer } from './reducer';
