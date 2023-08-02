import { Document, utils } from '@acaldas/document-model-libs/browser/document';
import {
    createEmptyExtendedScopeFrameworkState,
    reducer,
    ScopeFrameworkAction,
    ScopeFrameworkState,
    types,
} from '@acaldas/document-model-libs/browser/scope-framework';
import { useDocumentReducer } from '../../common';

export default function useScopeFrameworkReducer(
    document?: Document<ScopeFrameworkState, ScopeFrameworkAction>,
    onError?: (error: unknown) => void
) {
    return useDocumentReducer<types.ScopeFrameworkState, ScopeFrameworkAction>(
        reducer,
        document ??
            utils.createDocument(createEmptyExtendedScopeFrameworkState()),
        onError
    );
}
