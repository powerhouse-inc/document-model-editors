import {
    createEmptyExtendedScopeFrameworkState,
    ExtendedScopeFrameworkState,
    reducer,
    ScopeFrameworkAction,
    types,
} from '@acaldas/document-model-libs/browser/scope-framework';

import { useDocumentReducer } from '../common';

export default function useScopeFrameworkReducer(
    initialState: ExtendedScopeFrameworkState = createEmptyExtendedScopeFrameworkState()
) {
    return useDocumentReducer<types.ScopeFrameworkState, ScopeFrameworkAction>(
        reducer,
        initialState
    );
}
