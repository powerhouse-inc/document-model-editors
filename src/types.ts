import type { Action, BaseAction, Document } from 'document-model/document';

export type EditorContext = {
    theme: 'light' | 'dark';
    debug?: boolean;
};

export type EditorProps<S, A extends Action> = {
    document: Document<S, A>;
    dispatch: (action: A | BaseAction) => void;
    editorContext: EditorContext;
};
