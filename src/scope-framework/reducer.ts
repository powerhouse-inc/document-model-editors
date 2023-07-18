import {
    createEmptyExtendedScopeFrameworkState,
    reducer,
    ScopeFrameworkAction,
    types,
} from '@acaldas/document-model-libs/browser/scope-framework';

import { useDocumentReducer } from '../common';

export default function useScopeFrameworkReducer() {
    return useDocumentReducer<types.ScopeFrameworkState, ScopeFrameworkAction>(
        reducer,
        createEmptyExtendedScopeFrameworkState(),
        createEmptyExtendedScopeFrameworkState
    );
}
